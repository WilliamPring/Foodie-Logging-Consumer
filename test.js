var amqp = require('amqplib/callback_api');

amqp.connect('amqp://admin:pass@localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var exchange = 'logging';
    var args = process.argv.slice(2);
    var key = 'anonymous.logging.error';
    var msg = args.slice(1).join(' ') || 'Hello World!';

    channel.assertExchange(exchange, 'topic', {
      durable: false
    });

     //       query:
        //       params: [ 'hendrixsdfsdfsdfsdf', 'Changed email', 'asdf',new Date(), types.TimeUuid.now() ]

    var data = {
        log_application: 'Review',
        log_type: 'Exception',
        log_application_action: 'function',
        log_message: 'Error in graph layer',
        log_timestamp: new Date()
    }
    channel.publish(exchange, key, Buffer.from(JSON.stringify(data)));
    console.log(" [x] Sent %s:'%s'", key, msg);
  });

  setTimeout(function() {
    connection.close();
    process.exit(0)
  }, 500);
});