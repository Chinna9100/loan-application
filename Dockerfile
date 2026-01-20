FROM maven:3.8.5-eclipse-temurin-17-alpine AS build
WORKDIR /app
COPY backend/loanapp/pom.xml .
COPY backend/loanapp/src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/loanapp-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=prod"]
