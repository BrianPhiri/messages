const amqp = require('amqplib/callback_api')

// url to my online rabbitmq
var AMQP_URL = 'amqp://localhost'

amqp.connect(AMQP_URL, function(err, conn){
    if(err) throw err;
    // esstablish a channel
    conn.createChannel(function(err, ch){
        if(err) throw err;
        // define the exchnage
        var exchange = 'greetings'
        var msg = [
            {
                id : 1,
                msg : "hey"
            },
            {
                id : 2,
                msg : "Hello"
            }
        ]

        // going to use the fanout exchnage
        ch.assertExchange(exchange, 'fanout', {durable:false})
        // publish to that message
        ch.publish(exchange, '', new Buffer(JSON.stringify(msg)));
        console.log('sent message');
    });

     setTimeout(function() { conn.close(); process.exit(0) }, 500);

})