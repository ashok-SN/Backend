const amqp = require('amqplib/callback_api');
require('dotenv').config();

const connectToRabbitMQ = (callback) => {
  amqp.connect(process.env.RABBITMQ_URL, (err, conn) => {
    if (err) throw err;
    callback(conn);
  });
};

module.exports = connectToRabbitMQ;
