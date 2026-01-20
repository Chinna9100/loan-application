# Build stage
FROM maven:3.8.5-eclipse-temurin-17-alpine AS build
WORKDIR /app
COPY backend/loanapp/pom.xml .
COPY backend/loanapp/src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=prod"]

# Multi-stage: Build backend
FROM maven:3.8.5-openjdk-17 AS backend-build
WORKDIR /app
COPY backend/loanapp/pom.xml .
COPY backend/loanapp/src ./src
RUN mvn clean package -DskipTests

# Multi-stage: Build frontend (optional - if you want to serve frontend from backend)
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/loan-ui/package*.json ./
RUN npm ci
COPY frontend/loan-ui/ ./
RUN npm run build

# Final image
FROM openjdk:17-alpine
WORKDIR /app

# Copy backend jar
COPY --from=backend-build /app/target/*.jar app.jar

# Copy frontend static files (if you want to serve them from Spring Boot)
COPY --from=frontend-build /app/frontend/dist /static

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=prod"]
