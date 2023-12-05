// @ts-nocheck
const redis = require('redis')

const CHANNELS = {
  TEST: 'TEST',
  BLOCKCHAIN: 'BLOCKCHAIN'
}

class PubSub{
  constructor({blockchain}){
    this.blockchain = blockchain;

    this.publisher = redis.createClient();
    this.subscriber = redis.createClient();

    this.subscribeToCHannels();

    this.subscriber.on('message',(channel, message) => {
      this.handlerMessage(channel, message)
    })
  }

  subscribeToCHannels(){
    Object.values(CHANNELS).forEach((channel) => {
      this.subscriber.subscribe(channel)
    })
  }

  publish({channel, message}) {
    this.publisher.publish(channel, message);
  }

  handlerMessage(channel, message) {
    console.log(`Message received. Channel: ${channel}, Message: ${message}`)

    const parsedMessage = JSON.parse(message)
    if (channel === CHANNELS.BLOCKCHAIN){
      this.blockchain.replaceChain(parsedMessage);
    }
  }

  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain)
    })
  }
}

module.exports = PubSub