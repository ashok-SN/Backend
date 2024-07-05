const amqp = require('amqplib/callback_api');
const connectToRabbitMQ = require('../config/rabbitmq');

exports.createQueue = (req, res) => {
  const queueName = `queue_${req.user.username}`;
  connectToRabbitMQ((conn) => {
    conn.createChannel((err, ch) => {
      if (err) throw err;
      ch.assertQueue(queueName, { durable: true });
      res.status(201).send(`Queue ${queueName} created`);
    });
  });
};

exports.addToQueue = (req, res) => {
  const queueName = `queue_${req.user.username}`;
  const message = req.body;
  connectToRabbitMQ((conn) => {
    conn.createChannel((err, ch) => {
      if (err) throw err;
      ch.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
      res.status(200).send('Message added to queue');
    });
  });
};
Controller.exports= amqp;