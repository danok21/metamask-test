const ethereumButton = document.querySelector('.enableEthereumButton');

function ConnectMetamask() {

    ethereumButton.addEventListener('click', () => {

        if (typeof window.ethereum == 'undefined') {
            alert('Please install MetaMask');
        }
        getAccount();
    });
}

async function getAccount() {
    const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
    });
    alert(`Current connected account: ${accounts[0]}`);
}

ConnectMetamask();