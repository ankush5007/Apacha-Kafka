const { Kafka } = require("kafkajs");

const topic_name = "Data-Stream"

const kafka = new Kafka({
    clientId: "Basic-app",
    brokers: ["localhost:9092"]  // Broker Address
})


const consumer = kafka.consumer({ groupId: "data-streaming-group" });



const runConsumer = async () => {
    await consumer.connect()

    consumer.subscribe({ topic: topic_name, fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic_name, partition, message }) => {
            console.log(" ---------------------------------")
            console.log({
                partition,
                offset: message.offset,
                value: message.value.toString(),
            });
            console.log(" ---------------------------------")
        }
    })
    console.log("Consumer started successfully.")
}
runConsumer().catch(console.error)