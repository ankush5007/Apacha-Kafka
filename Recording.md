BackPressure Kafka Example
-------------------------- 
https://www.google.com/search?q=backpressure+node.js+kafkajs+example&sca_esv=445b43772c47b857&rlz=1C5CHFA_enIN1059IN1059&sxsrf=ANbL-n4w-R0P5WAoXypiQT5fi_pIcAoa7A%3A1769719378440&ei=UsZ7aYfTGoOgseMP8MCMmQY&ved=0ahUKEwiHxJ23zrGSAxUDUGwGHXAgI2MQ4dUDCBE&oq=backpressure+node.js+kafkajs+example&gs_lp=Egxnd3Mtd2l6LXNlcnAiJGJhY2twcmVzc3VyZSBub2RlLmpzIGthZmthanMgZXhhbXBsZUgAUABYAHAAeAGQAQCYAQCgAQCqAQC4AQzIAQCYAgCgAgCYAwCSBwCgBwCyBwC4BwDCBwDIBwCACAA&sclient=gws-wiz-serp



- we need to understand how kafkajs consumer works before deep dive backpressure 
    - Suppose there are n number of messages in topic waiting for consumption 
    - While consuming all messages does it consume all messages at once aka take dump of all binary data in memory at once ot take in chunk agar yeh samajh gaye to backpressure bhi samajh jayenge!!!