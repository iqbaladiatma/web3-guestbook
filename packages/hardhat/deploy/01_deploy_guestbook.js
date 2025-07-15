module.exports = async function (hre) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("Guestbook", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });
};

module.exports.tags = ["Guestbook"];
