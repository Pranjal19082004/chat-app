declare const UserGroup: Readonly<{
    get: (userId: number) => Set<number> | undefined;
    set: (userId: number, groupId: number) => void;
    delete: (userID: number, groupId: number) => void;
    deleteUser: (userID: number) => void;
}>;
export { UserGroup };
//# sourceMappingURL=userGroup.d.ts.map