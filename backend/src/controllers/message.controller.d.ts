import type { authRequest } from '../types.js';
import type { Response } from 'express';
export declare function getMessages(req: authRequest, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function DeleteMessage(req: authRequest, res: Response): Promise<void>;
export declare function updateMessage(req: authRequest, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=message.controller.d.ts.map