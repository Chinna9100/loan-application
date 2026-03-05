// package com.loan.loanapp.service;

// import com.loan.loanapp.dto.LoanRequest;
// import com.loan.loanapp.dto.LoanResponse;
// import com.loan.loanapp.entity.LoanEntity;
// import com.loan.loanapp.repository.LoanRepository;
// import org.springframework.stereotype.Service;

// import java.time.LocalDate;
// import java.time.temporal.ChronoUnit;

// @Service
// public class LoanService {

//     private final LoanRepository loanRepository;

//     public LoanService(LoanRepository loanRepository) {
//         this.loanRepository = loanRepository;
//     }

//     public LoanResponse calculate(LoanRequest req) {
//         LocalDate start = LocalDate.parse(req.startDate);
//         LocalDate end = LocalDate.parse(req.endDate);

//         long days = ChronoUnit.DAYS.between(start, end);
//         if (days < 0) days = 0;

//         double months = days / 30.0;
//         double interest = (req.amount * req.interestPerMonth / 100.0) * months;
//         double total = req.amount + interest;

//         System.out.println("Total Interest: " + interest);
//         System.out.println("Total Amount: " + total);

//         LoanResponse res = new LoanResponse();
//         res.amount = req.amount;
//         res.interestPerMonth = req.interestPerMonth;
//         res.startDate = req.startDate;
//         res.endDate = req.endDate;
//         res.totalDays = days;
//         res.totalInterest = Math.round(interest * 100.0) / 100.0;
//         res.totalAmount = Math.round(total * 100.0) / 100.0;

//         return res;
//     }

//     public LoanEntity save(LoanResponse res) {
//         LoanEntity entity = new LoanEntity();
//         entity.setAmount(res.amount);
//         entity.setInterestPerMonth(res.interestPerMonth);
//         entity.setStartDate(LocalDate.parse(res.startDate));
//         entity.setEndDate(LocalDate.parse(res.endDate));
//         entity.setTotalDays(res.totalDays);
//         entity.setTotalInterest(res.totalInterest);
//         entity.setTotalAmount(res.totalAmount);

//         return loanRepository.save(entity);
//     }
// }



package com.loan.loanapp.service;

import com.loan.loanapp.dto.LoanRequest;
import com.loan.loanapp.dto.LoanResponse;
import com.loan.loanapp.entity.LoanEntity;
import com.loan.loanapp.repository.LoanRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Service
public class LoanService {

    private final LoanRepository loanRepository;

    public LoanService(LoanRepository loanRepository) {
        this.loanRepository = loanRepository;
    }

    public LoanResponse calculate(LoanRequest req) {
        LocalDate start = LocalDate.parse(req.startDate);
        LocalDate end = LocalDate.parse(req.endDate);
        
        if (end.isBefore(start)) {
            throw new IllegalArgumentException("End date cannot be before start date");
        }

        long totalDays = ChronoUnit.DAYS.between(start, end);
        
        // Calculate interest based on actual days
        double interest = calculateInterestWithFlexibleMonths(
            req.amount, 
            req.interestPerMonth, 
            start, 
            end
        );
        
        double total = req.amount + interest;

        System.out.println("Total Interest: " + interest);
        System.out.println("Total Amount: " + total);

        LoanResponse res = new LoanResponse();
        res.amount = req.amount;
        res.interestPerMonth = req.interestPerMonth;
        res.startDate = req.startDate;
        res.endDate = req.endDate;
        res.totalDays = totalDays;
        res.totalInterest = Math.round(interest * 100.0) / 100.0;
        res.totalAmount = Math.round(total * 100.0) / 100.0;

        return res;
    }

    private double calculateInterestWithFlexibleMonths(
        double amount, 
        double interestPerMonth, 
        LocalDate startDate, 
        LocalDate endDate
    ) {
        LocalDate current = startDate;
        double totalInterest = 0.0;
        
        while (current.isBefore(endDate)) {
            // Get the last day of the current month
            LocalDate lastDayOfMonth = current.withDayOfMonth(
                current.lengthOfMonth()
            );
            
            // If end date is before the end of month, use end date
            LocalDate periodEnd = endDate.isBefore(lastDayOfMonth) ? 
                endDate : lastDayOfMonth;
            
            // Calculate days in this period
            long daysInPeriod = ChronoUnit.DAYS.between(current, periodEnd) + 1;
            
            // For interest calculation:
            // - If period is exactly 30 days or crosses month boundary, charge full month interest
            // - If period is less than 30 days but crosses month boundary, still charge full month
            // - If period ends mid-month with less than 30 days, calculate proportional interest
            
            boolean crossesMonthBoundary = !current.getMonth().equals(periodEnd.getMonth()) || 
                                          periodEnd.getDayOfMonth() == periodEnd.lengthOfMonth();
            
            if (crossesMonthBoundary || daysInPeriod >= 30) {
                // Full month interest for crossing month boundary or >=30 days
                totalInterest += (amount * interestPerMonth / 100.0);
            } else {
                // Proportional interest for partial month (less than 30 days, same month)
                double monthlyInterest = amount * interestPerMonth / 100.0;
                double dailyInterest = monthlyInterest / 30.0;
                totalInterest += dailyInterest * daysInPeriod;
            }
            
            // Move to next day after period end
            current = periodEnd.plusDays(1);
        }
        
        return totalInterest;
    }
    
    // Alternative simpler method using 30-day month logic
    private double calculateInterestWith30DayMonths(
        double amount, 
        double interestPerMonth, 
        LocalDate startDate, 
        LocalDate endDate
    ) {
        long totalDays = ChronoUnit.DAYS.between(startDate, endDate);
        
        // Calculate full months (30 days each)
        int fullMonths = (int) (totalDays / 30);
        int remainingDays = (int) (totalDays % 30);
        
        double monthlyInterest = amount * interestPerMonth / 100.0;
        double totalInterest = monthlyInterest * fullMonths;
        
        // Add proportional interest for remaining days
        if (remainingDays > 0) {
            double dailyInterest = monthlyInterest / 30.0;
            totalInterest += dailyInterest * remainingDays;
        }
        
        return totalInterest;
    }

    public LoanEntity save(LoanResponse res) {
        LoanEntity entity = new LoanEntity();
        entity.setAmount(res.amount);
        entity.setInterestPerMonth(res.interestPerMonth);
        entity.setStartDate(LocalDate.parse(res.startDate));
        entity.setEndDate(LocalDate.parse(res.endDate));
        entity.setTotalDays(res.totalDays);
        entity.setTotalInterest(res.totalInterest);
        entity.setTotalAmount(res.totalAmount);

        return loanRepository.save(entity);
    }
}

