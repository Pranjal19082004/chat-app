import type WebSocket from "ws";
import type { WsMssgMethod } from "../../types/wsTypes.js";
declare const router: Readonly<Record<WsMssgMethod, (payload: object, ws: WebSocket) => Promise<void>>>;
export default router;
//# sourceMappingURL=index.d.ts.map