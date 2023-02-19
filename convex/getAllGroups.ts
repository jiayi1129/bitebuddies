import { query } from "./_generated/server";

export default query(async ({ db }, startTimestamp: bigint, endTimestamp: bigint, price: bigint) => {
  return db
    .query("groups")
    .order("desc")
    .collect();
})
