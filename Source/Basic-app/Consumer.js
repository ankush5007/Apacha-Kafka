import KafkaConsumer from "./Kafka-Class/KafkaConsumer.js"


const topic_name = "Data-Stream"
const group_id = "data-streaming-group"
const consumer = new KafkaConsumer(topic_name,group_id)
const ConsumeMessageToTopic = async() =>{
  consumer.Consume((topic,partition,offset,value) =>{
    console.log("waitng for data to receive ...")
    console.log(" -------------- Message --------------")
  
    console.log({
        TopicName:topic,
        Partition:partition,
        offset: offset,
        Response: value
    });
    console.log(" -------------- Message --------------")
  })
}

ConsumeMessageToTopic()
// Explain this 
/**
 * https://www.google.com/search?q=%5ECError+during+shutdown%3A+Cannot+read+properties+of+undefined+%28reading+%27disconnect%27%29+kafkajs+consumer&sca_esv=089ea16314900d76&rlz=1C5CHFA_enIN1059IN1059&sxsrf=ANbL-n6nzURCT1o1IdCrw6ui0nEovxj9_A%3A1768825609743&ei=CSNuafWJLd-dseMPwoqJ4A0&ved=0ahUKEwi1so3xzJeSAxXfTmwGHUJFAtwQ4dUDCBE&uact=5&oq=%5ECError+during+shutdown%3A+Cannot+read+properties+of+undefined+%28reading+%27disconnect%27%29+kafkajs+consumer&gs_lp=Egxnd3Mtd2l6LXNlcnAiZF5DRXJyb3IgZHVyaW5nIHNodXRkb3duOiBDYW5ub3QgcmVhZCBwcm9wZXJ0aWVzIG9mIHVuZGVmaW5lZCAocmVhZGluZyAnZGlzY29ubmVjdCcpIGthZmthanMgY29uc3VtZXIyChAAGLADGNYEGEcyChAAGLADGNYEGEcyChAAGLADGNYEGEcyChAAGLADGNYEGEcyChAAGLADGNYEGEcyChAAGLADGNYEGEcyChAAGLADGNYEGEcyChAAGLADGNYEGEdIhh5QlgNYyRxwA3gBkAEAmAEAoAEAqgEAuAEDyAEA-AEC-AEBmAIDoAJDmAMAiAYBkAYIkgcBM6AHALIHALgHAMIHBTMtMi4xyAc1gAgA&sclient=gws-wiz-serp
 */

// This code is not workin why ?
process.on("SIGINT",() =>{
  console.log("SIGINT gets called ..")
  consumer.ConsumerDisconnect()
})
  

/*
// This one is working Explain why and how ?
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
signalTraps.forEach(type => {
  console.log("type is ",type)
  process.once(type, async () => {
    try {
      console.log("reached try block")
      // Check if consumer exists and is connected before disconnecting
      if (consumer) {
        console.log("consumer is active !!!")
        await consumer.ConsumerDisconnect()
        console.log('Consumer disconnected');
      }
    } finally {
      console.log("fnally workup")
      process.exit(0);
    }
  });
});
*/