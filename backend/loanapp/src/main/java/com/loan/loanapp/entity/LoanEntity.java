package com.loan.loanapp.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "loans")
public class LoanEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount;
    private Double interestPerMonth;

    private LocalDate startDate;
    private LocalDate endDate;

    private Long totalDays;
    private Double totalInterest;
    private Double totalAmount;

    public Long getId() { return id; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public Double getInterestPerMonth() { return interestPerMonth; }
    public void setInterestPerMonth(Double interestPerMonth) { this.interestPerMonth = interestPerMonth; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public Long getTotalDays() { return totalDays; }
    public void setTotalDays(Long totalDays) { this.totalDays = totalDays; }

    public Double getTotalInterest() { return totalInterest; }
    public void setTotalInterest(Double totalInterest) { this.totalInterest = totalInterest; }

    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }
}
