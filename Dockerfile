# Stage 1: Build backend
FROM maven:3.8.5-eclipse-temurin-17-alpine AS backend-build
WORKDIR /app/backend
COPY backend/pom.xml .
COPY backend/src ./src
RUN mvn clean package -DskipTests

# Stage 2: Build frontend (if Node.js)
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --only=production
COPY frontend/ ./
RUN npm run build

# Stage 3: Final image
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy backend
COPY --from=backend-build /app/backend/target/*.jar app.jar

# Copy frontend static files
COPY --from=frontend-build /app/frontend/build ./static

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=prod"]
