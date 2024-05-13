const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleDeFiToken", function () {
  let deployer, user1, user2;
  let token;
  const e24 = 10000000000000000000000000n;

  beforeEach(async function () {
    [deployer, user1, user2] = await ethers.getSigners();

    const simpleDeFiTokenFactory = await ethers.getContractFactory(
      "SimpleDeFiToken"
    );

    token = await simpleDeFiTokenFactory.deploy();
  });

  it("should have correct name, symbol and total supply", async () => {
    expect(await token.name()).to.equal("Simple DeFi Token");
    expect(await token.symbol()).to.equal("SDFT");
    expect(await token.totalSupply()).to.equal(e24);
  });

  it("Should transfer token from one to another", async () => {
    expect(await token.balanceOf(deployer.address)).to.equal(e24);
    await token.connect(deployer).transfer(user1.address, 5n);
    expect(await token.balanceOf(user1.address)).to.equal(5n);
    expect(await token.balanceOf(deployer.address)).to.equal(e24 - 5n);

    await expect(token.connect(user1).transfer(user2.address, 10n)).to.be
      .reverted;
  });

  it("Should burn token automatically when calling transferWithAutoBurn", async () => {
    await token.connect(deployer).transfer(user1.address, 1000000000000000000n);
    await token
      .connect(user1)
      .transferWithAutoBurn(user2.address, 1000000000000000000n);
  });
});
