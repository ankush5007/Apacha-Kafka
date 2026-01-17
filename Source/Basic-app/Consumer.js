import KafkaConsumer from "./Kafka-Class/KafkaConsumer.js"


const topic_name = "Data-Stream"
const group_id = "data-streaming-group"

const ConsumeMessageToTopic = async() =>{
  const consumer = new KafkaConsumer(topic_name,group_id)
  consumer.Consume((topic,partition,offset,value) =>{
    console.log("waitng for data to receive ...")
    console.log(" -------------- Message --------------")
  
    console.log({
        TopicName:topic,
        Partition:partition,
        offset: offset,
        Response: value
    });
    console.log(" -------------- Message --------------")
  })
}

ConsumeMessageToTopic()