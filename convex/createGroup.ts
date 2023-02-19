import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";


export default mutation(async ({ db }) => {
    return db.insert("groups", { users: [ new Id("users", "r3cSxQQDnH7hMiyTX2FLzw") ], timestamp: BigInt(1676768869), capacity: BigInt(5), restaurant: { name: "Sushiritto", location: "ChIJ4XGi8Wyjj4ARiD83x1GRHys", price: BigInt(1), image: "https://lh3.googleusercontent.com/p/AF1QipNSPrDtTzLpWKsjWyQyqdCplTMxDuPmDZhE96Cg=s1360-w1360-h1020", address: "448 University Avenue, Palo Alto, CA 94301" } } )
})