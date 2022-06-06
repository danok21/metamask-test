const ethereumButton = document.querySelector('.enableEthereumButton');
const web3 = require("web3");
let accounts = [];

function demoApp() {

    ethereumButton.addEventListener('click', () => {

        if (typeof window.ethereum == 'undefined') {
            alert('Please install MetaMask');
            return;
        } else {
            window.web3 = new web3(window.ethereum);
        }
        getAccount();
    });

    // event
    ethereum.on('accountsChanged', function(accounts) {
        alert(`Account currently being connected: ${accounts[0]}`);
    });

    ethereum.on('chainChanged', (chainId) => {
        // Handle the new chain.
        // Correctly handling chain changes can be complicated.
        // We recommend reloading the page unless you have good reason not to.
        window.location.reload();
    });

    // Sending Ethereum to an address
    document.getElementById("sendButton").addEventListener('click', () => {
        //check for Navigation Timing API support
        if (window.performance) {
            console.info("window.performance works fine on this browser");
        }
        if (performance !== 1) {
            getAccount();
        }
        let to = document.getElementById("addr").value.toString();
        console.log(typeof (document.getElementById('val').value))
        let amount = web3.utils.toWei(document.getElementById('val').value, 'ether');
        let value = Number(amount).toString(16);
        ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [{
                    from: accounts[0],
                    to,
                    value,
                    // gasPrice: '0x09184e72a000',
                    // gas: '0x2710',
                }],
            })
            .then((txHash) => {
                document.getElementById("showTxHash").innerText = txHash;
            })
            .catch((error) => console.error)
    });

    document.getElementById('viewTx').addEventListener('click', () => {
        let addr = document.getElementById("showTxHash").innerText;
        let netVer = ethereum.networkVersion;
        if (netVer === 4) {
            open(`https://rinkeby.etherscan.io/tx/${addr}`);
        } else if (netVer === 256) {
            open(`https://testnet.hecoinfo.com/tx/${addr}`);
        }
    })
}

async function getAccount() {
    accounts = await ethereum.request({
        method: 'eth_requestAccounts'
    });
}

window.onload = demoApp();
