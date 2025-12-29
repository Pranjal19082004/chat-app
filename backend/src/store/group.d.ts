declare const Groups: Readonly<{
    get: (groupId: number) => number[] | undefined;
    set: (groupId: number, userId: number) => void;
    delete: (groupId: number, userId: number) => void;
}>;
export default Groups;
//# sourceMappingURL=group.d.ts.map