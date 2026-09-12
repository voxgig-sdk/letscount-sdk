import { LetscountEntityBase } from '../LetscountEntityBase';
import type { LetscountSDK } from '../LetscountSDK';
import type { Control } from '../types';
import type { GetCounter, GetCounterLoadMatch } from '../LetscountTypes';
declare class GetCounterEntity extends LetscountEntityBase<GetCounter> {
    constructor(client: LetscountSDK, entopts: any);
    make(this: GetCounterEntity): GetCounterEntity;
    load(this: any, reqmatch?: GetCounterLoadMatch, ctrl?: Control): Promise<GetCounterEntity>;
}
export { GetCounterEntity };
