import { type Response } from 'express';
import type { authRequest } from '../types.js';
export declare function createGroup(req: authRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function joinGroup(req: authRequest, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=group.controller.d.ts.map