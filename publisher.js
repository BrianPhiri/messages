const amqp = require('amqplib/callback_api')

// url to my online rabbitmq
var AMQP_URL = 'amqp://localhost'

amqp.connect(AMQP_URL, function(err, conn){
    if(err) throw err;
    conn.createChannel(function(err, ch){
        if(err) throw err;
        var exchange = 'fruits'
        var keyApple = 'apple.red.big'
        var keyBanana = 'banana.yellow.big'
        var msgApple = 'apple'
        var msgBanana = 'banana'

        ch.assertExchange(exchange, 'topic',{durable:false})
        ch.publish(exchange, keyApple, new Buffer(msgApple))
        ch.publish(exchange, keyBanana, new Buffer(msgBanana))

        console.log('Sent the messages')
    })

    setTimeout(function() { conn.close(); process.exit(0) }, 500);
})



// //////////////////// //
//  fanout exchange    //
// /////////////////// //

// create a connection
// amqp.connect(AMQP_URL, function(err, conn){
//     if(err) throw err;
//     // esstablish a channel
//     conn.createChannel(function(err, ch){
//         if(err) throw err;
//         // define the exchnage
//         var exchange = 'greetings'
//         var msg = 'Hello there?'

//         // going to use the fanout exchnage
//         ch.assertExchange(exchange, 'fanout', {durable:false})
//         // publish to that message
//         ch.publish(exchange, '', new Buffer(msg));
//         console.log('sent message');
//     });

//      setTimeout(function() { conn.close(); process.exit(0) }, 500);

// })