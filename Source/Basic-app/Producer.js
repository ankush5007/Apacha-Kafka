import KafkaProducer from "./Kafka/KafkaProducer.js"
import { nanoid } from "nanoid"; 

const topic_name = "Data-Stream"

const sendMessageToTopic = async() =>{

    const producer = new KafkaProducer(topic_name)
    
    setInterval(async() =>{
        let response = producer.Produce({key:"Data_key1",value:JSON.stringify({msg:"Data-Stream is on work!!!",UniqueId:nanoid(),timestamp:new Date().toLocaleString()})})
        response.then((response) => console.log(response))
    },3000)

    // Handle Graceful Shut Down for SIGINt (Ctrl+C)
    process.on('SIGINT', async () => {
        console.log('Received SIGINT, shutting down...');
        try {
          await producer.ProducerDisconnect(); // Close connection
          console.log('Producer disconnected gracefully ...');
          process.exit(0); // Exit the process
        } catch (error) {
          console.error('Error during graceful shutdown:', error);
          process.exit(1); // Exit with error code
        }
      });

}

sendMessageToTopic()


