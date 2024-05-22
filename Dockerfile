# Use a base image with Java 17
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the packaged JAR file to the working directory
COPY target/App-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your application runs on
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "app.jar"]

#Diseño y arquitectura de software
#@author
#    Santiago Sánchez Cárdenas - 0000271976
#    Sergio Gabriel Nieto Meneses - 0000246107
#    Mauricio Andres Valderrama Acosta - 0000251802

