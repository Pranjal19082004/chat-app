import { type Response } from "express";
import type { authRequest } from "../../types/types.js";
export declare function listUserContact(req: authRequest, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function addUserContact(req: authRequest, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function deletContact(req: authRequest, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=contact.d.ts.map