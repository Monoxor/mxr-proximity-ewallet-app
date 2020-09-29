
// const axios = require('axios')


// const sendToQueue = async (queue, msg) => {
//   try {
//     const connection = await amqp.connect(rabbitMqUrl)
//     const channel = await connection.createChannel()
//     channel.assertQueue(queue, {
//       durable: true,
//     })
//     channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)), {
//       persistent: true,
//     })
//     setTimeout(() => {
//       connection.close()
//     }, 500)
//   } catch (error) {
//     console.log(error)
//   }
// }


// module.exports = {
//   sendToQueue: sendToQueue
// }
