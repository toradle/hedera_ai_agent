import BigNumber from "bignumber.js";
function fromDisplayToBaseUnit(displayBalance, decimals) {
  return displayBalance * 10 ** decimals;
}
function fromBaseToDisplayUnit(baseBalance, decimals) {
  const decimalsBigNumber = new BigNumber(decimals);
  const divisor = new BigNumber(10).pow(decimalsBigNumber);
  const bigValue = BigNumber.isBigNumber(baseBalance) ? baseBalance : new BigNumber(baseBalance);
  return bigValue.dividedBy(divisor);
}
export {
  fromBaseToDisplayUnit,
  fromDisplayToBaseUnit
};
//# sourceMappingURL=index83.js.map
