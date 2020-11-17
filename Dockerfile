FROM openjdk:8-jdk

COPY . /estimate3d/
EXPOSE 9000
WORKDIR /estimate3d

RUN ./gradlew clean build && ln -s build/libs/estimate3d-*.jar estimate3d.jar

CMD ["java", "-jar", "estimate3d.jar"]
