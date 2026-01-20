import kafkaConfig from "./KafkaConfig.js"

class KafkaProducer {
    
    constructor(Topic_Name){
        console.log("KafkaProducer constructor gets called ...")
        this.Producer = kafkaConfig.producer()
        console.log("Instance of Producer created ...")
        this.TopicName = Topic_Name
    }

    async Produce(Message){
        try{
            await this.Producer.connect()
            console.log("Producer instance connected with Broker successfully ...")
            await this.Producer.send({
                topic:this.TopicName,
                messages:[Message]
            })
            return 1
        }catch(error){
            console.log(error)
        }finally{ // cleanup
            await this.Producer.disconnect()
            console.log("Producer disconnect successfully ...")
        }
    }
    async ProducerDisconnect(){
        await this.Producer.disconnect()
    }
}

export default KafkaProducer