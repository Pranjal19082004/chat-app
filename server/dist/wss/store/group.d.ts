declare const Groups: Readonly<{
    get: (groupId: number) => Set<number> | undefined;
    set: (groupId: number, userId: number) => void;
    delete: (groupId: number, userId: number) => void;
    deleteGroup: (groupId: number) => void;
}>;
export default Groups;
//# sourceMappingURL=group.d.ts.map