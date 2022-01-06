import { config } from "dotenv";
import { CasinoRoyale } from "./casino-royale";

config({ path: "../.env" });
console.log(process.env.BASE_URL);

(async () => {
    const casino = new CasinoRoyale();
    await casino.init("aboba2");
})()
