import { config } from "dotenv";
import { CasinoRoyale } from "./casino-royale";
import { LcgCracker } from "./lcg-cracker";
import { MtCracker } from "./mt-cracker"

config({ path: "../.env" });

(async () => {
    const casino = new CasinoRoyale();
    await casino.init("aboba8");

    // LCG
    const lcgCracker = new LcgCracker(BigInt(2 ** 32))
    await casino.visit(lcgCracker)
    console.log(lcgCracker.getResult())

    // MT
    const mtCracker = new MtCracker()
    await casino.visit(mtCracker)
    console.log(mtCracker.getResult())
})()
