/**
 * Topic Cleanup
 */
const { Kafka, ConfigResourceTypes } = require("kafkajs");

const kafka = new Kafka({
    clientId: "Basic-app",
    brokers: ["localhost:9092"]  // Broker Address
})


const admin = kafka.admin()

const clearTopicByRetention = async (topicName) => {
    try {
        await admin.connect()

        // 1. Set retention to a very short time (e.g., 1 second)
        await admin.alterConfigs({
            resources: [
                {
                    type: 2, // for topic,
                    name: topicName,
                    configEntries: [{ name: 'retention.ms', value: '1000' }],
                },
            ],
            configType: 2 // 2 for Topic
        })
        console.log(`Retention policy set to 1 second for topic: ${topicName}`);

        // Wait briefly for Kafka to perform the cleanup
        await new Promise(resolve => setTimeout(resolve, 5000));
        console.log(`Wait for Cleanup to Perform ..... for the topc ${topicName} `)

        /*
        // 2. Restore the original (or default) retention policy
        await admin.alterConfigs({
            resources: [
                {
                    type: 2, // for topic,
                    name: topicName,
                    configEntries: [{ name: 'retention.ms', value: '<original_value>' }], // Replace <original_value> with your desired value
                },
            ],
            configType: 2 // 2 for Topic
        })
        */
    } catch (error) {
        console.error('Error clearing topic via retention policy:', error);
    } finally {
        await admin.disconnect();
    }
}

clearTopicByRetention("Data-Stream")