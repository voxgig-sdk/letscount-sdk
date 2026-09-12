import { CreateOrUpdateCounterEntity } from './entity/CreateOrUpdateCounterEntity';
import { DecrementCounterEntity } from './entity/DecrementCounterEntity';
import { GetCounterEntity } from './entity/GetCounterEntity';
import { IncrementCounterEntity } from './entity/IncrementCounterEntity';
export type * from './LetscountTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { LetscountEntityBase } from './LetscountEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class LetscountSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    CreateOrUpdateCounter(entopts?: Record<string, any>): CreateOrUpdateCounterEntity;
    DecrementCounter(entopts?: Record<string, any>): DecrementCounterEntity;
    GetCounter(entopts?: Record<string, any>): GetCounterEntity;
    IncrementCounter(entopts?: Record<string, any>): IncrementCounterEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): LetscountSDK;
    tester(testopts?: any, sdkopts?: any): LetscountSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof LetscountSDK;
export { stdutil, config, BaseFeature, LetscountEntityBase, LetscountSDK, SDK, };
