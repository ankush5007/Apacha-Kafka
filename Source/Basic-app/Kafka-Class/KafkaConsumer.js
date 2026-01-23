import kafkaConfig from "./KafkaConfig.js"

/**
 * Graceful ShutDown 
 * monitor consumer connect status
 * https://www.google.com/search?q=check+kafka+consumer+is+connected+kafkajs+node.js&rlz=1C5CHFA_enIN1059IN1059&oq=check+kafka+consumer+is+connected+kafkajs+node.js&gs_lcrp=EgZjaHJvbWUyCQgAEEUYORigATIHCAEQIRigAdIBCTY3MTg5ajBqNKgCALACAQ&sourceid=chrome&ie=UTF-8
 */

class KafkaConsumer {
    
    constructor(Topic_Name,group_id){
        this.Consumer = kafkaConfig.consumer(
            {groupId:group_id,
            // Set the heartbeat interval in milliseconds (e.g., 3000ms or 3 seconds)
            heartbeatInterval: 5000,
            // Set the session timeout in milliseconds (e.g., 10000ms or 10 seconds)
            sessionTimeout: 10000,
            })
        this.TopicName = Topic_Name
        this.GroupID = group_id
        this.heartBeats = this.Consumer.events.HEARTBEAT  // Events for constantly check
        this.lastheartbeat = 0
        this.sessionTimeout = 15000
    }
    async Consume(cb){
        try{
            await this.Consumer.connect()
            console.log("consumer connected successfully ...")
            
            await this.Consumer.subscribe({topic:this.TopicName,fromBeginning:true})
            console.log(`consumer subscribed to topic ${this.TopicName} successfully ...`)

            // explain this ?
            this.Consumer.on(this.heartBeats,({timestamp}) =>{
                this.lastheartbeat = timestamp
            })

            await this.Consumer.run({
                eachMessage: async ({ topic_name, partition, message }) => {
                    const value = message.value.toString()
                    cb( this.TopicName,partition,message.offset,value) // callback
                }
            })
            console.log("Consumer started successfully and ready to receive messages ...")
        }catch(error){
            console.log(`Error while connecting the consumer ${error.message}`)
        }
    } 
    async ConsumerDisconnect(){
        //console.log("ConsumerDisconnect method gets called ...")
        try{
            await this.Consumer.disconnect()
            console.log("Consumer Disconnect Successfully ...")
            process.exit(0)
        }catch(error){
            console.log(`Error during shutdown: ${error.message}`)
            process.exit(0)
        }
    }
    async isConsumerHealthy() { // Explain the Logic
        if ((Date.now() - this.lastheartbeat) < this.sessionTimeout) {
            return true;
        }
        return false;
    }  
}

export default KafkaConsumer