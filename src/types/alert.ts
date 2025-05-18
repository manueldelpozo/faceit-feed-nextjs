import { ALERT_VARIANTS, ALERT_POSITIONS } from '@/consts/alert';
import { UnionTypeOfLiterals } from '@/types/utility';

export type TAlertVariant = UnionTypeOfLiterals<typeof ALERT_VARIANTS>;
export type TAlertPosition = UnionTypeOfLiterals<typeof ALERT_POSITIONS>; 