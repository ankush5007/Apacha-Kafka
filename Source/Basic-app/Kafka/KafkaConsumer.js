import kafkaConfig from "./KafkaConfig.js"

class KafkaConsumer {
    
    constructor(Topic_Name,group_id){
        this.Consumer = kafkaConfig.consumer({groupId:group_id})
        this.TopicName = Topic_Name
        this.GroupID = group_id
    }
    async Consume(cb){
        try{
            await this.Consumer.connect()
            
            await this.Consumer.subscribe({topic:this.TopicName,fromBeginning:true})

            await this.Consumer.run({
                eachMessage: async ({ topic_name, partition, message }) => {
                    const value = message.value.toString()
                    cb( this.TopicName,partition,message.offset,value) // callback
                }
            })
            console.log("Consumer started successfully.")
        }catch(error){
            console.log(error)
        }
    }    
}

export default KafkaConsumer