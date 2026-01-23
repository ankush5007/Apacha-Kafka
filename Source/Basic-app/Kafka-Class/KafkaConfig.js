import { Kafka } from "kafkajs"; 
import {CLIENTID,RROKERS} from "./Constant.js"


// Kafka Config 
const kafkaConfig = new Kafka({
    clientId:CLIENTID,
    brokers:RROKERS,  // Broker Address
    retry: {
        initialRetryTime: 100, // Wait at least 100ms initially
        retries: 8,            // Retry up to 8 times
        maxRetryTime: 60000,   // Max wait time for a single retry operation (60s)
      }
})


export default kafkaConfig