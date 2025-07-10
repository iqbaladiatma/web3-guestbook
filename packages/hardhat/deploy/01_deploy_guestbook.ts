import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployGuestbook: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("Guestbook", {
    from: deployer,
    // Contract constructor arguments (jika ada, Guestbook tidak punya)
    args: [],
    log: true, // Menampilkan info deploy di terminal
    autoMine: true,
  });
};

export default deployGuestbook;

// Tags are useful for running specific deploy scripts
deployGuestbook.tags = ["Guestbook"];
