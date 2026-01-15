Topic Basics
why partition is required 
why sequence of order is must in key 
why key is  used 
benfits of key ? why we need key based data and data in form or ordering 
How topic used partition for displaying the data 
consumer with specific partition
why keys are important in partition when you can directly consume data from direct partition 
        order_id,payment_id,sensor_id produced data without key and then consume with and without partition 
        order_id,payment_id,sensor_id produced data with key and then consume with and without partition
        
why consumer group are required what he does actually 


# Why we need key for partition in kafka mentioned example and explore usecases 
Example: Order Management 

Consider a Kafka topic named customer-orders that records every action a customer takes: OrderCreated, ItemAdded, PaymentProcessed, OrderShipped. OrderClicked,Item Removed etc.. 
Without a Key (Null Key)

If you send messages without a key, they might be scattered across different partitions: 
Partition 1: Customer-A: OrderCreated
Partition 2: Customer-A: ItemAdded
Partition 3: Customer-A: PaymentProcessed
...and so on.

A consumer processing Partition 1 might see the OrderCreated event before the ItemAdded event arrives on Partition 2. The consumer has an incomplete view of the order and cannot process the 
full transaction correctly until all related events are processed in order. 
With a Key (Customer ID or Order ID)

If you use the customer-id or order-id as the message key, all messages for a specific order are guaranteed to arrive on the same partition: 
Partition 1: (Empty)
Partition 2: (Empty)
Partition 3: Key=Customer-A: OrderCreated, Key=Customer-A: ItemAdded, Key=Customer-A: etc,,PaymentProcessed  etc...

same apply with bnk traxn also
Now, the consumer assigned to Partition 3 receives all events for Customer A in the exact order they were sent. It can reliably process the entire transaction and maintain a consistent, correct state for the customer's order. 

In summary, the key is a fundamental mechanism for bringing order and consistency to the distributed nature of a Kafka cluster.



# Startergies to create/Manage/Distribute Partition 

# Real usuage of consumer group

# message consume only once 

# Startergirs to
