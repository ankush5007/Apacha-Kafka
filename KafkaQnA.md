# Kafka Race Condition 
    https://www.google.com/search?q=kafka+race+conditions&rlz=1C5CHFA_enIN1059IN1059&oq=kafka+race+con&gs_lcrp=EgZjaHJvbWUqBwgAEAAYgAQyBwgAEAAYgAQyBggBEEUYOTIICAIQABgWGB4yCAgDEAAYFhgeMggIBBAAGBYYHjIHCAUQABjvBdIBCDI1NTRqMGo0qAIAsAIA&sourceid=chrome&ie=UTF-8


# Why Consumer are required for the Kafka Group
    https://www.google.com/search?q=why+consumer+group+is+required+in+kafka+example&sca_esv=72595ab23592d5f0&rlz=1C5CHFA_enIN1059IN1059&biw=1280&bih=623&sxsrf=ANbL-n5Ijr7hhQhPqFITB1ts5W6qukGnQg%3A1771936318315&ei=PpqdaY_-ErmMseMPkpyagAM&ved=0ahUKEwiPlcWWkfKSAxU5RmwGHRKOBjAQ4dUDCBE&uact=5&oq=why+consumer+group+is+required+in+kafka+example&gs_lp=Egxnd3Mtd2l6LXNlcnAiL3doeSBjb25zdW1lciBncm91cCBpcyByZXF1aXJlZCBpbiBrYWZrYSBleGFtcGxlMgUQIRigATIFECEYoAFI1w1Q4ANYoQxwAXgBkAEAmAHkAaABkAyqAQUwLjUuM7gBA8gBAPgBAZgCCaACzAzCAgoQABiwAxjWBBhHwgIGEAAYFhgewgILEAAYgAQYhgMYigXCAggQABiiBBiJBcICBRAhGJ8FmAMAiAYBkAYIkgcFMS40LjSgB-MdsgcFMC40LjS4B8IMwgcFMC4zLjbIByKACAA&sclient=gws-wiz-serp


    A Kafka consumer group is essential to enable parallel processing, horizontal scalability, and fault tolerance by allowing multiple consumers to split the workload of a topic's partitions. Within a group, each partition is assigned to only one consumer, ensuring orderly processing while enabling high throughput. 
Confluent Developer
Confluent Developer
 +3
Key Reasons for Consumer Groups:
Parallelism & Throughput: If a topic has four partitions, a consumer group with four consumers allows each to read from one partition simultaneously, making processing four times faster.
Fault Tolerance: If one consumer in a group fails, Kafka automatically rebalances the partitions to the remaining healthy consumers, ensuring no data is missed.
Scalability: You can easily add more consumers to a group to handle higher data volume, up to the number of partitions available.
Independent Consumption: Multiple consumer groups can read the same topic independently (e.g., one for analytics, one for database storage). 
Stack Overflow
Stack Overflow
 +6
Example Scenario:
Imagine a "shipping" topic with 4 partitions. If you have one "shipping-service" consumer group with 2 instances, each instance processes 2 partitions. If you add 2 more instances to the same group, Kafka rebalances to 1 partition per consumer for maximum speed.


[Understandings]
https://www.google.com/search?q=why+consumer+group+is+required+in+kafka+example&sca_esv=72595ab23592d5f0&rlz=1C5CHFA_enIN1059IN1059&biw=1280&bih=623&sxsrf=ANbL-n5Ijr7hhQhPqFITB1ts5W6qukGnQg%3A1771936318315&ei=PpqdaY_-ErmMseMPkpyagAM&ved=0ahUKEwiPlcWWkfKSAxU5RmwGHRKOBjAQ4dUDCBE&uact=5&oq=why+consumer+group+is+required+in+kafka+example&gs_lp=Egxnd3Mtd2l6LXNlcnAiL3doeSBjb25zdW1lciBncm91cCBpcyByZXF1aXJlZCBpbiBrYWZrYSBleGFtcGxlMgUQIRigATIFECEYoAFI1w1Q4ANYoQxwAXgBkAEAmAHkAaABkAyqAQUwLjUuM7gBA8gBAPgBAZgCCaACzAzCAgoQABiwAxjWBBhHwgIGEAAYFhgewgILEAAYgAQYhgMYigXCAggQABiiBBiJBcICBRAhGJ8FmAMAiAYBkAYIkgcFMS40LjSgB-MdsgcFMC40LjS4B8IMwgcFMC4zLjbIByKACAA&sclient=gws-wiz-serp