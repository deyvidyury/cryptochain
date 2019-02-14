const {
    GENESIS_DATA
} = require('./config');
const cryptoHash = require('./crypto-hash')
class Block {
    constructor({
        timestamp,
        nonce,
        difficulty,
        lastHash,
        hash,
        data
    }) {
        this.timestamp = timestamp;
        this.nonce = nonce;
        this.difficulty = difficulty;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    static genesis() {
        return new this(GENESIS_DATA);
    }

    static mineBlock({
        lastBlock,
        data
    }) {
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;

        return new this({
            timestamp,
            lastHash,
            data,
            hash: cryptoHash(timestamp, lastHash, data)
        });
    }
}

module.exports = Block;