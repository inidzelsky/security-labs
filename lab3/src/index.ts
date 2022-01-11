import { config } from "dotenv";
import { CasinoRoyale } from "./casino-royale";
import { LcgCracker } from "./lcg-cracker";

config({ path: "../.env" });

(async () => {
    const casino = new CasinoRoyale();
    await casino.init("aboba2");
    const lcgCracker = new LcgCracker(BigInt(2 ** 32))
    await casino.visit(lcgCracker)
    console.log(lcgCracker.getResult())
})()
