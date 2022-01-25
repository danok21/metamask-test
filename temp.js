getAccount();
ethereum
    .request({
        method: 'eth_sendTransaction',
        params: [{
            from: accounts[0],
            to: '0xF07149221A4C85c26feCC560c5970Ec1415f6735',
            value: '0x302e30310a',
            gasPrice: '0x09184e72a000',
            gas: '0x2710',
        }],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error);