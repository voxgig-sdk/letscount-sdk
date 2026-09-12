import { LetscountEntityBase } from '../LetscountEntityBase';
import type { LetscountSDK } from '../LetscountSDK';
import type { Control } from '../types';
import type { IncrementCounter, IncrementCounterUpdateData } from '../LetscountTypes';
declare class IncrementCounterEntity extends LetscountEntityBase<IncrementCounter> {
    constructor(client: LetscountSDK, entopts: any);
    make(this: IncrementCounterEntity): IncrementCounterEntity;
    update(this: any, reqdata?: IncrementCounterUpdateData, ctrl?: Control): Promise<IncrementCounterEntity>;
}
export { IncrementCounterEntity };
