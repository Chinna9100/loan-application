# Loan Full Stack Project (React + Spring Boot + MySQL)

This folder contains:
- backend/loanapp  -> Spring Boot API
- frontend/loan-ui -> React + TypeScript UI

- Required installation and add the path into the environment variables.

## Run Locally
### 1) Start MySQL and create DB
Create database: loan_db

### 2) Run Backend
cd backend/loanapp
mvn spring-boot:run

### 3) Run Frontend
cd frontend/loan-ui
npm install
npm run dev

Open:
for front-end: http://localhost:5173
for backend: http://localhost:8080/


🏆 Congratulations!
Your full-stack loan application backend is now:

✅ Connected to MySQL

✅ Running on port 8080

✅ Ready to serve API requests

✅ Integrated with Hibernate JPA

Hibernate: 
    select
        le1_0.id,
        le1_0.amount,
        le1_0.end_date,
        le1_0.interest_per_month,
        le1_0.start_date,
        le1_0.total_amount,
        le1_0.total_days,
        le1_0.total_interest
    from
        loans le1_0
Hibernate: 
    select
        le1_0.id,
        le1_0.amount,
        le1_0.end_date,
        le1_0.interest_per_month,
        le1_0.start_date,
        le1_0.total_amount,
        le1_0.total_days,
        le1_0.total_interest
    from
        loans le1_0
Hibernate: 
    insert
    into
        loans
        (amount, end_date, interest_per_month, start_date, total_amount, total_days, total_interest)
    values
        (?, ?, ?, ?, ?, ?, ?)
Hibernate: 
    select
        le1_0.id,
        le1_0.amount,
        le1_0.end_date,
        le1_0.interest_per_month,
        le1_0.start_date,
        le1_0.total_amount,
        le1_0.total_days,
        le1_0.total_interest
    from
        loans le1_0
