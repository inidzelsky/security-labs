import { config } from "dotenv";
import { CasinoRoyale } from "./casino-royale";

config({ path: "../.env" });

(async () => {
    const casino = new CasinoRoyale();
    await casino.init("aboba2");
})()
