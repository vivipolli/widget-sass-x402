import hre from "hardhat";

async function main() {
  console.log("Deploying IntentRegistry contract...");

  const IntentRegistry = await hre.ethers.getContractFactory("IntentRegistry");
  const intentRegistry = await IntentRegistry.deploy();

  await intentRegistry.waitForDeployment();

  const address = await intentRegistry.getAddress();
  console.log("IntentRegistry deployed to:", address);
  console.log("Save this address to your .env file as CONTRACT_ADDRESS");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
