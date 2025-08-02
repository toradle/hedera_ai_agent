import { AccountId, CustomRoyaltyFee, Long, CustomFixedFee, TokenId, CustomFractionalFee, FeeAssessmentMethod } from "@hashgraph/sdk";
const SERIALIZED_KEY_DESCRIPTION = "serialized string). Builder handles parsing.";
const FEE_COLLECTOR_DESCRIPTION = "Fee collector's account ID. Defaults to user's account if in user-centric context and not specified.";
function parseCustomFeesJson(customFeesJson, logger) {
  let parsedFeesInput;
  try {
    parsedFeesInput = JSON.parse(customFeesJson);
    if (!Array.isArray(parsedFeesInput)) {
      throw new Error("customFeesJson did not parse to an array.");
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error("Invalid JSON string for customFeesJson:", errorMessage);
    throw new Error(`Invalid JSON string for customFeesJson: ${errorMessage}`);
  }
  return parsedFeesInput.map((feeData, index) => {
    const feeCollectorAccountIdStr = feeData.feeCollectorAccountId;
    if (!feeCollectorAccountIdStr || typeof feeCollectorAccountIdStr !== "string") {
      throw new Error(
        `Fee #${index + 1}: feeCollectorAccountId is required and must be a string.`
      );
    }
    const feeCollectorAccountId = AccountId.fromString(
      feeCollectorAccountIdStr
    );
    let newFee;
    switch (feeData.feeType) {
      case "FIXED_FEE":
        const fixedFee = new CustomFixedFee().setFeeCollectorAccountId(
          feeCollectorAccountId
        );
        if (feeData.denominatingTokenId) {
          fixedFee.setDenominatingTokenId(
            TokenId.fromString(feeData.denominatingTokenId)
          );
        }
        if (feeData.amount === void 0 || feeData.amount === null) {
          throw new Error(`Fee #${index + 1} (FIXED_FEE): amount is required.`);
        }
        fixedFee.setAmount(
          typeof feeData.amount === "string" ? Long.fromString(feeData.amount) : Long.fromNumber(feeData.amount)
        );
        newFee = fixedFee;
        break;
      case "FRACTIONAL_FEE":
        if (feeData.numerator === void 0 || feeData.denominator === void 0) {
          throw new Error(
            `Fee #${index + 1} (FRACTIONAL_FEE): numerator and denominator are required.`
          );
        }
        const fractionalFee = new CustomFractionalFee().setFeeCollectorAccountId(feeCollectorAccountId).setNumerator(Long.fromValue(feeData.numerator)).setDenominator(Long.fromValue(feeData.denominator));
        if (feeData.minimumAmount) {
          fractionalFee.setMin(
            typeof feeData.minimumAmount === "string" ? Long.fromString(feeData.minimumAmount) : Long.fromNumber(feeData.minimumAmount)
          );
        }
        if (feeData.maximumAmount) {
          fractionalFee.setMax(
            typeof feeData.maximumAmount === "string" ? Long.fromString(feeData.maximumAmount) : Long.fromNumber(feeData.maximumAmount)
          );
        }
        if (feeData.assessmentMethod === "EXCLUSIVE" || feeData.netOfTransfers === true) {
          fractionalFee.setAssessmentMethod(FeeAssessmentMethod.Exclusive);
        } else {
          fractionalFee.setAssessmentMethod(FeeAssessmentMethod.Inclusive);
        }
        newFee = fractionalFee;
        break;
      case "ROYALTY_FEE":
        if (feeData.numerator === void 0 || feeData.denominator === void 0) {
          throw new Error(
            `Fee #${index + 1} (ROYALTY_FEE): numerator and denominator are required.`
          );
        }
        const royaltyFee = new CustomRoyaltyFee().setFeeCollectorAccountId(feeCollectorAccountId).setNumerator(Long.fromValue(feeData.numerator)).setDenominator(Long.fromValue(feeData.denominator));
        if (feeData.fallbackFee) {
          if (typeof feeData.fallbackFee !== "object" || feeData.fallbackFee === null) {
            throw new Error(
              `Fee #${index + 1} (ROYALTY_FEE): fallbackFee must be an object if provided.`
            );
          }
          const fallback = new CustomFixedFee().setFeeCollectorAccountId(
            feeCollectorAccountId
          );
          if (feeData.fallbackFee.denominatingTokenId) {
            fallback.setDenominatingTokenId(
              TokenId.fromString(feeData.fallbackFee.denominatingTokenId)
            );
          }
          if (feeData.fallbackFee.amount === void 0 || feeData.fallbackFee.amount === null) {
            throw new Error(
              `Fee #${index + 1} (ROYALTY_FEE): fallbackFee.amount is required.`
            );
          }
          fallback.setAmount(
            typeof feeData.fallbackFee.amount === "string" ? Long.fromString(feeData.fallbackFee.amount) : Long.fromNumber(feeData.fallbackFee.amount)
          );
          royaltyFee.setFallbackFee(fallback);
        }
        newFee = royaltyFee;
        break;
      default:
        throw new Error(
          `Fee #${index + 1}: Unknown custom fee type: ${feeData.feeType}. Supported types are FIXED_FEE, FRACTIONAL_FEE, ROYALTY_FEE.`
        );
    }
    if (feeData.allCollectorsAreExempt && typeof feeData.allCollectorsAreExempt === "boolean") {
      newFee.setAllCollectorsAreExempt(feeData.allCollectorsAreExempt);
    }
    return newFee;
  });
}
export {
  FEE_COLLECTOR_DESCRIPTION,
  SERIALIZED_KEY_DESCRIPTION,
  parseCustomFeesJson
};
//# sourceMappingURL=index60.js.map
