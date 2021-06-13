import React, {Component} from 'react';
import DVideo from '../abis/DVideo.json';
import Navbar from './Navbar';
import Main from './Main';
import Web3 from 'web3';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        /* Setting initial State */
        this.state = {
            buffer: null,
            loading: true,
            account: '',
            dVideo: null,
            videos: [],
            currentHash: null,
            currentTitle: null
        }
    }

    async componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    /* Connecting the Browser with MetaMask Extension to the Blockchain based Website */
    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert('Non-Ethereum Browser detected. You should using the MetaMask Extension');
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3;
        /* Load all Accounts from Wallet */
        const accounts = await web3.eth.getAccounts();
        /* Adding first Account to the State */
        this.setState({account: accounts[0]});

        /* Getting the connected Network from the Wallet */
        const networkId = await web3.eth.net.getId();

        /* Getting the Network Data from the ABI */
        const networkData = DVideo.networks[networkId];

        /* Checking if Network exists */
        if (networkData) {
            /* JavaScript Version of the Smart Contract */
            const dVideo = new web3.eth.Contract(DVideo.abi, DVideo.networks[networkId].address);
            const videoCount = await dVideo.methods.videoCount().call();
            /* Loading Videos and sort them by Newest */
            for (let i = videoCount; i >= 1; i--) {
                let video = await dVideo.methods.videos(i).call();
                this.setState({
                    videos: [...this.state.videos, video]
                });
            }
            /* Setting latest Video with Title to View as Default */
            const latestVideo = await dVideo.methods.videos(videoCount).call();
            /* Updating the State */
            this.setState({
                dVideo: dVideo,
                videoCount: videoCount,
                currentHash: latestVideo.hash,
                currentTitle: latestVideo.title,
                loading: false
            });
        } else {
            window.alert('Smart Contract DVideo is not deployed to detected Network');
        }
    }

    /* Getting the Video and converting it to a Buffer Object (to process it on IPFS) */
    captureFile = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            this.setState({
                buffer: Buffer(reader.result)
            });
            console.log('Buffer', this.state.buffer)
        }
    }

    /* Uploading the Video to IPFS */
    /* Video is available on IPFS on the following Link: https://ipfs.infura.io/ipfs/xxx */
    uploadVideo = async (title) => {
        /* Declaring IPFS */
        const {create} = require('ipfs-http-client');
        /* Leaving out the Arguments will default to these Values */
        const ipfsClient = create({
            host: 'ipfs.infura.io',
            port: '5001',
            protocol: 'https'
        });
        const response = await ipfsClient.add(this.state.buffer);
        this.setState({
            loading: true,

        });
        await this.state.dVideo.methods.uploadVideo(response.path, title)
            /* Send Transaction from current Account */
            .send({from: this.state.account})
            /* Waiting until Feedback from Transaction */
            .on('transactionHash', (hash) => {
                this.setState({
                    loading: false
                });
            });
    }

    /* Changing the Videos on the Website */
    changeVideo = (hash, title) => {
        this.setState({
            currentHash: hash,
            currentTitle: title
        });
    }

    render() {
        return (
            <div>
                <Navbar account={this.state.account}/>
                {this.state.loading
                    ? <div id="loader" className="text-center mt-5"><p>Loading Page</p></div>
                    : <Main
                        captureFile={this.captureFile}
                        uploadVideo={this.uploadVideo}
                        changeVideo={this.changeVideo}
                        currentTitle={this.state.currentTitle}
                        currentHash={this.state.currentHash}
                        videos={this.state.videos}
                    />
                }
            </div>
        );
    }
}

export default App;