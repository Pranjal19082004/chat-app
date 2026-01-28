import { type Response } from "express";
import type { authRequest } from "../../types/types.js";
export declare function createGroup(req: authRequest, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getUserGroup(req: authRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function joinGroup(req: authRequest, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function leaveGroup(req: authRequest, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=group.d.ts.map