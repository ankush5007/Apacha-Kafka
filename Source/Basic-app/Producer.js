import KafkaProducer from "./Kafka-Class/KafkaProducer.js"
import { nanoid } from "nanoid";
import http from "node:http"

const topic_name = "Data-Stream"

const port = 5000;

const server = http.createServer(async (req, res) => {
  if (req.url === '/') {

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: "Welcome to Home Page", status: "success" }));
    res.end();

  } else if (req.url === '/Produce' && req.method == "POST") {
    let body = '';

    // Listen for 'data' events to collect the incoming data chunks
    req.on('data', (chunk) => {
      body += chunk.toString(); // Convert the buffer to a string
    });

    // Listen for the 'end' event to signal that the entire body has been received
    req.on('end', async () => {
      try {
        // Parse the accumulated string data as JSON
        //console.log(body)
        const postData = JSON.parse(body);
        //console.log('Received JSON data:', postData);
        postData["uuid"] = nanoid()
        postData["timestamp"] = new Date().toLocaleString()
        //console.log('Modified JSON data:', postData);


        // Produce the message
        const producer = new KafkaProducer(topic_name)
        let response = await producer.Produce({ key: "Data-Key1", value: JSON.stringify(postData) })
        if (response) {
          console.log(`Msg sent Successfully on ${topic_name} on Timestamp ${new Date().toLocaleString()}`)
          // Prepare and send a JSON response
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            message: 'Data received and Produced successfully',
            receivedData: postData
          }));
        }
      } catch (error) {
        // Handle JSON parsing errors
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    })
  } else {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: "Bad Request", status: "failed :):)" }));
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});



const sendMessageToTopic = async () => {

  const producer = new KafkaProducer(topic_name)

  setInterval(async () => {
    let response = await producer.Produce({ key: "Data_key1", value: JSON.stringify({ msg: "Data-Stream is on work!!!", UniqueId: nanoid(), timestamp: new Date().toLocaleString() }) })
    if(response)  console.log(`Msg sent Successfully on ${topic_name} on Timestamp ${new Date().toLocaleString()}`)
  }, 1000)
}

sendMessageToTopic()



