import kafkaConfig from "./KafkaConfig.js"

/**
 * Graceful ShutDown 
 * monitor consumer connect status
 */

class KafkaConsumer {
    
    constructor(Topic_Name,group_id){
        this.Consumer = kafkaConfig.consumer({groupId:group_id})
        this.TopicName = Topic_Name
        this.GroupID = group_id
    }
    async Consume(cb){
        try{
            await this.Consumer.connect()
            console.log("consumer connected successfully ...")
            
            await this.Consumer.subscribe({topic:this.TopicName,fromBeginning:true})
            console.log(`consumer subscribed to topic ${this.TopicName} successfully ...`)

            await this.Consumer.run({
                eachMessage: async ({ topic_name, partition, message }) => {
                    const value = message.value.toString()
                    cb( this.TopicName,partition,message.offset,value) // callback
                }
            })
            console.log("Consumer started successfully and ready to receive messages ...")
        }catch(error){
            console.log(error)
        }
    } 
    async ConsumerDisconnect(){
        console.log("ConsumerDisconnect method gets called ...")
        try{
            await this.Consumer.disconnect()
            console.log("Consumer Disconnect Successfully ...")
            console.log(this.Consumer)
            process.exit(0)
        }catch(error){
            console.log(`Error during shutdown: ${error.message}`)
            process.exit(0)
        }
    }  
}

export default KafkaConsumer