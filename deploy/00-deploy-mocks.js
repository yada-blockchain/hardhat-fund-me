const { network } = require("hardhat");
const {
    DECIMALS,
    INITIAL_PRICE,
    developmentChains,
} = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;
    // If we are on a local develohelppment network, we need to deploy mocks!
    console.log("deploying .....");
    // if (developmentChains.includes(network.name)) {
    if (chainId === 31337) {
        log("Local network detected! Deploying mocks...");
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_PRICE],
        });
        log("Mocks Deployed!");
        log("------------------------------------------------");
        log(
            "You are deploying to a local network, you'll need a local network running to interact"
        );
        log(
            "Please run `npx hardhat console` to interact with the deployed smart contracts!"
        );
        log("------------------------------------------------");
    }
};
module.exports.tags = ["all", "mocks"];
