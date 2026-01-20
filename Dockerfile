# Use Alpine for smaller size
FROM maven:3.8.5-openjdk-17-alpine AS build
WORKDIR /app
COPY backend/loanapp/pom.xml .
COPY backend/loanapp/src ./src
RUN mvn clean package -DskipTests

FROM openjdk:17-alpine
WORKDIR /app
COPY --from=build /app/target/loanapp-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=prod"]
