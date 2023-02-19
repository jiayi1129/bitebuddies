import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";


export default mutation(async ({ db }, groupId: Id<"groups">, userId: Id<"users">) => {
    const doc = await db.get(groupId);
    if (!doc) {
        throw new Error("Called joinGroup on a group that doesn't exist");
    }
    return db.patch(groupId, { users: [ ...doc.users, userId ] } );
})
