# Stage 1: Build the application
FROM gradle:7.4.1-jdk17 AS build
WORKDIR /home/gradle/src
COPY --chown=gradle:gradle . .
RUN gradle build --no-daemon

# Stage 2: Run the application
FROM openjdk:17-slim-buster
WORKDIR /app
COPY --from=build /home/gradle/src/build/libs/*.jar app.jar
EXPOSE 6000
ENTRYPOINT ["java","-jar","app.jar"]
