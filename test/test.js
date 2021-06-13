const DVideo = artifacts.require('./DVideo.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should();

contract('DVideo', ([deployer, author]) => {
    let dVideo;

    before(async () => {
        dVideo = await DVideo.deployed()
    });

    describe('Deployment', async () => {
        it('Deploys successfully', async () => {
            const address = await dVideo.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        });

        it('Video has a name', async () => {
            const name = await dVideo.name();
            assert.equal(name, 'DVideo');
        });
    });

    describe('Videos', async () => {
        let result, videoCount;
        /* Test IPFS Hash */
        const hash = 'QmNoMhVF2budZMwwt4ccUddJgTDyjXMFqyLMrSfVnQ21r9';
        const videoTitle = 'Video Example Title';

        before(async () => {
            result = await dVideo.uploadVideo(hash, videoTitle, {from: author});
            videoCount = await dVideo.videoCount();
        });

        /* Checking the Event */
        it('Creates Videos', async () => {
            /* Happy Path - SUCCESS */
            assert.equal(videoCount, 1);
            const event = result.logs[0].args;
            assert.equal(event.id.toNumber(), videoCount.toNumber(), 'ID is correct');
            assert.equal(event.hash, hash, 'Hash is correct');
            assert.equal(event.title, 'Video Example Title', 'Title is correct');
            assert.equal(event.author, author, 'Author is correct');

            /* Bad / Exception Paths */
            /* FAILURE: Video must have a Hash */
            await dVideo.uploadVideo('Video Title', '', {from: author}).should.be.rejected;
            /* FAILURE: Video must have Title */
            await dVideo.uploadVideo('', 'Video Hash', {from: author}).should.be.rejected;
        });

        /* Checking the Struct */
        it('Lists Videos', async () => {
            const video = await dVideo.videos(videoCount);
            assert.equal(video.id.toNumber(), videoCount.toNumber(), 'ID is correct');
            assert.equal(video.hash, hash, 'Hash is correct');
            assert.equal(video.title, 'Video Example Title', 'Title is correct');
            assert.equal(video.author, author, 'Author is correct');
        });
    });
});