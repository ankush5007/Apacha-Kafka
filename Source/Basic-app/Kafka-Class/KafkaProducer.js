import kafkaConfig from "./KafkaConfig.js"

class KafkaProducer {
    
    constructor(Topic_Name){
        this.Producer = kafkaConfig.producer()
        this.TopicName = Topic_Name
    }

    async Produce(Message){
        try{
            await this.Producer.connect()
            console.log("Producer connected successfully ... ");
            await this.Producer.send({
                topic:this.TopicName,
                messages:[Message]
            })
            return `Msg sent Successfully on ${this.TopicName} on Timestamp ${new Date().toLocaleString()}`
        }catch(error){
            console.log(error)
        }finally{
            await this.Producer.disconnect()
        }
    }
    async ProducerDisconnect(){
        await this.Producer.disconnect()
    }
}

export default KafkaProducer