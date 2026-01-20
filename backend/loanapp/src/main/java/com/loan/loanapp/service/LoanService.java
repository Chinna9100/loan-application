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

        long days = ChronoUnit.DAYS.between(start, end);
        if (days < 0) days = 0;

        double months = days / 30.0;
        double interest = (req.amount * req.interestPerMonth / 100.0) * months;
        double total = req.amount + interest;

        LoanResponse res = new LoanResponse();
        res.amount = req.amount;
        res.interestPerMonth = req.interestPerMonth;
        res.startDate = req.startDate;
        res.endDate = req.endDate;
        res.totalDays = days;
        res.totalInterest = Math.round(interest * 100.0) / 100.0;
        res.totalAmount = Math.round(total * 100.0) / 100.0;

        return res;
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
