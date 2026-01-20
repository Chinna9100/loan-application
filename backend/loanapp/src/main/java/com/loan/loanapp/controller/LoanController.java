package com.loan.loanapp.controller;

import com.loan.loanapp.dto.LoanRequest;
import com.loan.loanapp.dto.LoanResponse;
import com.loan.loanapp.entity.LoanEntity;
import com.loan.loanapp.repository.LoanRepository;
import com.loan.loanapp.service.LoanService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loans")
@CrossOrigin(origins = "*")
public class LoanController {

    private final LoanService loanService;
    private final LoanRepository loanRepository;

    public LoanController(LoanService loanService, LoanRepository loanRepository) {
        this.loanService = loanService;
        this.loanRepository = loanRepository;
    }

    @PostMapping("/calculate")
    public LoanResponse calculate(@RequestBody LoanRequest req) {
        return loanService.calculate(req);
    }

    @PostMapping("/save")
    public LoanEntity save(@RequestBody LoanResponse res) {
        return loanService.save(res);
    }

    @GetMapping("/all")
    public List<LoanEntity> getAll() {
        return loanRepository.findAll();
    }
}
