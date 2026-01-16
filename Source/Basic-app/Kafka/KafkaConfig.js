import { Kafka } from "kafkajs"; 
import {CLIENTID,RROKERS} from "./Constant.js"


// Kafka Config 
const kafkaConfig = new Kafka({
    clientId:CLIENTID,
    brokers:RROKERS  // Broker Address
})


export default kafkaConfig