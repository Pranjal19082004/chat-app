import jwt from "jsonwebtoken";
export function authMiddleware(req, res, next) {
    try {
        let token = req.headers.authorization ?? " ";
        token = token.split(" ")[1] ?? " ";
        if (!token) {
            return res.status(403).json({ message: "please sign in" });
        }
        const SecretKey = process.env.JWT_SECRET_KEY ?? " ";
        const payload = jwt.verify(token, SecretKey);
        // @ts-ignore
        req.user = payload;
        next();
    }
    catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.json(403).json({ message: "please signin" });
        }
        else if (e instanceof jwt.TokenExpiredError) {
            return res.status(403).json({ message: "your token is expired" });
        }
        return res.status(500).json({ message: "internal server error" });
    }
}
//# sourceMappingURL=authMiddleware.js.map