pragma solidity ^0.5.0;

contract DVideo {
    /* Number that stores the Count of all Videos ever will be created */
    uint public videoCount = 0;
    string public name = "DVideo";

    /* Mapping the ID to Video (Struct) */
    mapping(uint => Video) public videos;

    /* Struct to model a Video */
    struct Video {
        uint id;
        /* Location from IPFS */
        string hash;
        string title;
        /* User from Wallet */
        address author;
    }

    /* Create an Event when a new Video is stored */
    event VideoUploaded(uint id, string hash, string title, address author);

    constructor() public {}

    function uploadVideo(string memory _videoHash, string memory _title) public {
        /* Require that Arguments exists */
        /* Converting the _videoHash to Bytes and requires that the Video Hash Length is greater then 0 */
        require(bytes(_videoHash).length > 0);
        /* Converting the _title to Bytes and requires that the Video Title Length is greater then 0 */
        require(bytes(_title).length > 0);
        /* Requires that the Sender Address is not equal an empty Address */
        require(msg.sender != address(0));
        address author = msg.sender;

        /* Increment Video ID to be unique */
        videoCount++;

        /* Add Video to the Mapping (Smart Contract) */

        videos[videoCount] = Video(videoCount, _videoHash, _title, author);

        /* Trigger an Event when a new Video is stored */
        emit VideoUploaded(videoCount, _videoHash, _title, author);
    }
}
