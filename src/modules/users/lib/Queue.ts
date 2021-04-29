import { connect, Channel, Message } from 'amqplib';

export default {
  async start(): Promise<Channel> {
    const conn = connect(String(process.env.RABBITMQ_CONNECTION_URL));
    const channel = (await conn).createChannel();

    return channel;
  },

  async publishInQueue(
    queue: string,
    message: string,
    channel: Channel,
  ): Promise<boolean> {
    const publish = channel.sendToQueue(queue, Buffer.from(message));

    return publish;
  },

  async publishInExchange(
    exchange: string,
    routingKey: string,
    message: string,
    channel: Channel,
  ): Promise<boolean> {
    const publishExchange = channel.publish(
      exchange,
      routingKey,
      Buffer.from(message),
    );

    return publishExchange;
  },

  async consume(
    queue: string,
    channel: Channel,
    callback: (message: Message) => void,
  ) {
    return channel.consume(queue, message => {
      if (message !== null) {
        callback(message);
        channel.ack(message);
      }
    });
  },
};
