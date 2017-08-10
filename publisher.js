const amqp = require('amqplib/callback_api')

// url to my online rabbitmq
var AMQP_URL = 'amqp://ehlbpomi:AODIFxJKO0QmTUqke2_FHjy5AKKcQ5ed@wasp.rmq.cloudamqp.com/ehlbpomi'

// create a connection
amqp.connect(AMQP_URL, function(err, conn){
    if(err) throw err;
    // esstablish a channel
    conn.createChannel(function(err, ch){
        if(err) throw err;
        // define the exchnage
        var exchange = 'greetings'
        var msg = 'Hello there?'

        // going to use the fanout exchnage
        ch.assertExchange(exchange, 'fanout', {durable:false})
        // publish to that message
        ch.publish(ex, '', new Buffer(msg));
        console.log('sent message');
    });

     setTimeout(function() { conn.close(); process.exit(0) }, 500);

})