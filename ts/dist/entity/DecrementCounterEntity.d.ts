import { LetscountEntityBase } from '../LetscountEntityBase';
import type { LetscountSDK } from '../LetscountSDK';
import type { Control } from '../types';
import type { DecrementCounter, DecrementCounterRemoveMatch } from '../LetscountTypes';
declare class DecrementCounterEntity extends LetscountEntityBase<DecrementCounter> {
    constructor(client: LetscountSDK, entopts: any);
    make(this: DecrementCounterEntity): DecrementCounterEntity;
    remove(this: any, reqmatch?: DecrementCounterRemoveMatch, ctrl?: Control): Promise<DecrementCounterEntity>;
}
export { DecrementCounterEntity };
