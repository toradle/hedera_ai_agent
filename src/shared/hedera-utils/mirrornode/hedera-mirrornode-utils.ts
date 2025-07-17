import { HederaMirrornodeServiceDefaultImpl } from './hedera-mirrornode-service-default-impl';
import { MirrornodeConfig } from './types';

export const getMirrornodeService = (mirrornodeConfig: MirrornodeConfig) => {
  if (mirrornodeConfig.mirrornodeService) {
    return mirrornodeConfig.mirrornodeService;
  }
  return new HederaMirrornodeServiceDefaultImpl(mirrornodeConfig.ledgerId);
};
