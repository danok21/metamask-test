const ethereumButton = document.querySelector('.enableEthereumButton');
let accounts = [];

function demoApp() {
    console.log(ethereum.network);

    ethereumButton.addEventListener('click', () => {

        if (typeof window.ethereum == 'undefined') {
            alert('Please install MetaMask');
        }
        getAccount();
    });

    // Sending Ethereum to an address
    document.getElementById("sendButton").addEventListener('click', () => {
        //check for Navigation Timing API support
        if (window.performance) {
            console.info("window.performance works fine on this browser");
        }
        if (performance != 1) {
            getAccount();
        }
        let to = document.getElementById("addr").value.toString();
        let amount = parseFloat(document.getElementById('val').value) * 1000000000000000000;
        // console.log(amount);
        let value = "0x" + Number(amount).toString(16);
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
        if (netVer == 4) {
            open(`https://rinkeby.etherscan.io/tx/${addr}`);
        } else if (netVer == 256) {
            open(`https://testnet.hecoinfo.com/${addr}`);
        }
    })
}


// test addresss: '0xe26f015ba6b8c400cE327CeEBE34B717e6897e69'
// Number(17).toString(16) // 11
// parseInt("11", 16) // 17
async function getAccount() {
    accounts = await ethereum.request({
        method: 'eth_requestAccounts'
    });
}


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

demoApp();