const DeployerAddress = "0xc4B10987fA290b6392Ae06373Dcf86a5253F76B4";
const DeployerAbi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "MintERC20",
				"type": "address"
			}
		],
		"name": "Deployed",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_salt",
				"type": "uint256"
			},
			{
				"internalType": "address[]",
				"name": "_admins",
				"type": "address[]"
			}
		],
		"name": "deploy",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "get_salt",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "latest_salt",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

export default {
    DeployerAddress,
    DeployerAbi
}