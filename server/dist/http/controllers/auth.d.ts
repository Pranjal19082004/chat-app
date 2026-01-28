import type { Request, Response } from "express";
export declare function signUp(req: Request, res: Response): Promise<Response>;
export declare function signin(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function lastOnline(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=auth.d.ts.map