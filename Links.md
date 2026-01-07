https://medium.com/@AmolDamodar/mac-kafka-setup-with-docker-34142681cfd7


https://medium.com/@dinubhagya97/connecting-apache-kafka-to-a-node-js-app-using-kafkajs-and-docker-c5376db360a8


# creation
docker exec -it <KAFKA_CONTAINER_NAME> kafka-topics --create --topic <TOPIC_NAME> --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1


docker exec -it kafka-learn kafka-topics --create --topic basic-app-topic --bootstrap-server localhost:9092


# Docker Basics 
    https://medium.com/@dmostoller/docker-why-its-important-and-how-it-s-used-in-real-world-configuration-07faccbf561e


# Kafka Basics

# Listing
docker exec -it kafka-learn kafka-topics --list --bootstrap-server localhost:9092 


# Send messages to the topic
docker exec -it kafka-learn kafka-console-producer --topic basic-app-topic --bootstrap-server localhost:9092

# read message to the topic 
docker exec -it kafka-learn kafka-console-consumer --topic basic-app-topic --bootstrap-server localhost:9092 --from-beginning
