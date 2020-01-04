const Block = require('./block');
const { GENESIS_DATA } = require('./config');
describe('Block',() => {
    const timestamp="date";
    const lastHash="lh";
    const hash="h";
    const data="d";
    const block= new Block({
        timestamp: timestamp,
        lastHash : lastHash,
        hash : hash,
        data : data
    });

    it('has a timestamp, lastHash, hash and data',() => {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
    });

    describe('genesis()', () => {
        const genesisBlock = Block.genesis();

        it('returns a  block instance', () => {
            expect(genesisBlock instanceof Block).toBe(true);
        });

        it('returns the genesis data', () => {
            expect(genesisBlock).toEqual(GENESIS_DATA);
        });
    });

});