function validator(schema, payload, onError) {
    try {
        const res = schema.parse(payload);
        return res;
    }
    catch (e) {
        onError(e);
    }
}
export {};
//# sourceMappingURL=validator.js.map