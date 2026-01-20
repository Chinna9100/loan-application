# Backend - Spring Boot + MySQL

## Requirements
- Java 17+
- Maven
- MySQL running locally (or online DB later)

## Create DB (Local)
Create a database named: `loan_db`

Example:
```sql
CREATE DATABASE loan_db;
```

## Configure DB
Edit:
`src/main/resources/application.properties`

Update:
- username
- password

## Run Backend
```bash
mvn spring-boot:run
```

## API Endpoints
- POST http://localhost:8080/api/loans/calculate
- POST http://localhost:8080/api/loans/save
- GET  http://localhost:8080/api/loans/all
