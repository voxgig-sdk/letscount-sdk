import { Context } from './Context';
declare class LetscountError extends Error {
    isLetscountError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { LetscountError };
