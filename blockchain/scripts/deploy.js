const hre = require("hardhat");

async function main() {
  const DAO = await hre.ethers.getContractFactory("DAO");
  const dao = await DAO.deploy();
  await dao.deployed();
  console.log("WinWinDAO deployed to:", dao.address);

  const Proposal = await hre.ethers.getContractFactory("WinDAO");
  const proposal = await Proposal.deploy();
  await proposal.deployed();
  console.log("Proposal for WinDAO deployed to:", proposal.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
