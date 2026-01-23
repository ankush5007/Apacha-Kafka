import KafkaConsumer from "./Kafka-Class/KafkaConsumer.js"


const topic_name = "Data-Stream"
const group_id = "data-streaming-group"
const consumer = new KafkaConsumer(topic_name,group_id)
const ConsumeMessageToTopic = async() =>{
  consumer.Consume((topic,partition,offset,value) =>{
    console.log("waitng for data to receive ...")
    console.log(" -------------- Message --------------")
    let response = JSON.parse(value)
    console.log
    ({
      TopicName:topic,
      PartitionName:partition,
      offset: offset,
      CompleteResponse: value,
      Timestamp:response["timestamp"]
    })
    console.log(" -------------- Message --------------")
  })
}
setInterval(async () => {
  const healthy = await consumer.isConsumerHealthy()
  console.log(`Consumer health status: ${healthy ? 'Healthy and maintain connection with Broker' : 'Unhealthy retry to connect with Broker'}`);
}, 5000); // Check every 5 seconds

ConsumeMessageToTopic()


// Handle Graceful shutdown of the consumer
process.on("SIGINT",() =>{
  console.log("SIGINT signal gets triggered ..")
  consumer.ConsumerDisconnect()
})
