const amqp = require('amqplib/callback_api')

// url to my online rabbitmq
var AMQP_URL = 'amqp://ehlbpomi:AODIFxJKO0QmTUqke2_FHjy5AKKcQ5ed@wasp.rmq.cloudamqp.com/ehlbpomi'

// establish connection
amqp.connect(AMQP_URL, function(err, conn){
    if(err) throw err;
    conn.createChannel(function(err, ch){
        if(err) throw err;
        var exchange = 'greetings'
        // using fanout
        ch.assertExchange(exchange, 'fanout', {durable:false})
        // esstablish a queue (Rabbit creates it for us)
        ch.assertQueue('', {exclusive:true}, function(err, q){
            console.log("waiting for message....")

            // bind the exchange to the queue
            ch.bindQueue(q.queue, exchange,'');

            ch.consume(q.queue, function(msg){
                console.log(msg.content.toString())
            })
        })
    })
})