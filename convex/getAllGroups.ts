import { query } from "./_generated/server";

export default query(async ({ db }, startTimestamp: bigint, endTimestamp: bigint, price: bigint) => {
  return db
    .query("groups")
    .order("desc")
    .filter(q => q.gte(q.field("timestamp"), startTimestamp))
    .filter(q => q.lte(q.field("timestamp"), endTimestamp))
    .filter(q => q.lte(q.field("restaurant.price"), price))
    .collect();
})
