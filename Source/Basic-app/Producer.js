const { Kafka } = require("kafkajs"); 
const { nanoid } = require("nanoid"); 

const topic_name = "Data-Stream"

const kafka = new Kafka({
    clientId:"Basic-app",
    brokers:["localhost:9092"]  // Broker Address
})

const Producer = kafka.producer()

const key_1 ="Data_key1"
const key_2 ="Data_key2"
const key_3 ="Data_key3"


const runProducer = async() =>{
    await Producer.connect()
    console.log("Producer connected successfully");
    
    // Handle Graceful Shut Down for SIGINt (Ctrl+C)
    process.on('SIGINT', async () => {
        console.log('Received SIGINT, shutting down...');
        try {
          await Producer.disconnect(); // Close connection
          clearInterval(Interval1)
          //clearInterval(Interval2)
          //clearInterval(Interval3)
          console.log('Producer disconnected gracefully ...');
          console.log("Interval Cleared Successfully ...")
          process.exit(0); // Exit the process
        } catch (error) {
          console.error('Error during graceful shutdown:', error);
          process.exit(1); // Exit with error code
        }
      });
    
    let i = 0
    let Interval1 = setInterval(async() =>{
        try{
            await Producer.send({
                topic:topic_name,
                messages:[{
                    key:key_1,
                    value:JSON.stringify({msg:"Data-Stream is on work!!!",UniqueId:nanoid(),timestamp:new Date().toLocaleString()})}]
            })
            console.log(`Message sent successfully... key-name = ${key_1} `)
        }catch(error){
            console.log("Error Sending message to Kafka",error)
        }
    },3000)

    /*
    let Interval2 = setInterval(async() =>{
        try{
            await Producer.send({
                topic:topic_name,
                messages:[{key:key_2,value:JSON.stringify({msg:"hello to All",timestamp:new Date().toLocaleString()})}]
            })
            console.log(`Message sent successfully... key-name = ${key_2} `)
        }catch(error){
            console.log("Error Sending message to Kafka",error)
        }
    },12000)

    let Interval3 = setInterval(async() =>{
        try{
            await Producer.send({
                topic:topic_name,
                messages:[{key:key_3,value:JSON.stringify({msg:"hello to All",timestamp:new Date().toLocaleString()})}]
            })
            console.log(`Message sent successfully... key-name = ${key_3} `)
        }catch(error){
            console.log("Error Sending message to Kafka",error)
        }
    },9000)
    */
}

runProducer().catch(console.error)


