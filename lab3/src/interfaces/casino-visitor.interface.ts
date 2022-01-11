import { CasinoRoyale } from "src/casino-royale";

export interface ICasinoVisitor {
    crack(casino: CasinoRoyale): Promise<void>
    getResult(): Record<string, unknown>
}