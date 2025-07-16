import { HederaMirrornodeServiceDefaultImpl } from "./hedera-mirrornode-service-default-impl";
import { MirrornodeConfig } from "./types";

export const getMirrornodeService = (mirrornodeConfig: MirrornodeConfig) => {
    if (mirrornodeConfig.MirrornodeService) {
        return mirrornodeConfig.MirrornodeService;
    }
    return new HederaMirrornodeServiceDefaultImpl(mirrornodeConfig.ledgerId);
}