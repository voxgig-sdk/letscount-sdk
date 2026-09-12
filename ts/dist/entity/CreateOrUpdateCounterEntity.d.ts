import { LetscountEntityBase } from '../LetscountEntityBase';
import type { LetscountSDK } from '../LetscountSDK';
import type { Control } from '../types';
import type { CreateOrUpdateCounter, CreateOrUpdateCounterCreateData } from '../LetscountTypes';
declare class CreateOrUpdateCounterEntity extends LetscountEntityBase<CreateOrUpdateCounter> {
    constructor(client: LetscountSDK, entopts: any);
    make(this: CreateOrUpdateCounterEntity): CreateOrUpdateCounterEntity;
    create(this: any, reqdata?: CreateOrUpdateCounterCreateData, ctrl?: Control): Promise<CreateOrUpdateCounterEntity>;
}
export { CreateOrUpdateCounterEntity };
