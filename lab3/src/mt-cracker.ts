import MersenneTwister = require("mersenne-twister")
import { CasinoRoyale } from "./casino-royale"
import { ICasinoVisitor } from "./interfaces/casino-visitor.interface"
import { PlayMode } from "./types/casino.types"

export class MtCracker implements ICasinoVisitor {
    private seed: number

    async crack(casino: CasinoRoyale): Promise<void> {
        const minSeed = Math.floor(Date.now() / 1000)
        const { realNumber } = await casino.play({
            mode: PlayMode.Mt,
            amount: 1,
            number: 1,
        })
        const maxSeed = Math.floor(Date.now() / 1000)

        let possibleSeed: number = minSeed
        while (possibleSeed <= maxSeed) {
            if (new MersenneTwister(possibleSeed++).random_int() === realNumber) {
                this.seed = possibleSeed
                return
            }
        }

        throw new Error("Seed could not be found")
    }

    getResult(): Record<string, unknown> {
        return {
            seed: this.seed,
        }
    }
}
