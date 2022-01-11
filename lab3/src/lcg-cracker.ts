import { CasinoRoyale } from "./casino-royale";
import { ICasinoVisitor } from "./interfaces/casino-visitor.interface";
import { PlayMode } from "./types/casino.types";
import { mod } from "./utils"

type LcgCrackResult = {
    multiplier: bigint
    incrementer: bigint
}

export class LcgCracker implements ICasinoVisitor {
    private multiplier: bigint
    private incrementer: bigint
    private modulo: bigint

    constructor(modulo: bigint) {
        this.modulo = modulo
    }
    
    public async crack(casino: CasinoRoyale): Promise<void> {
        const firstTry = await casino.play({ mode: PlayMode.Lcg, amount: 1, number: 1 })
        const secondTry = await casino.play({ mode: PlayMode.Lcg, amount: 1, number: 1 })
        const thirdTry = await casino.play({ mode: PlayMode.Lcg, amount: 1, number: 1 })

        const randomNumbersTuple: [bigint, bigint, bigint] = 
            [firstTry, secondTry, thirdTry].map(({ realNumber }) => realNumber) as [bigint, bigint, bigint]

        this.multiplier = this.calculateMultiplier(randomNumbersTuple)
        this.incrementer = this.calculateIncrementer([randomNumbersTuple[1], randomNumbersTuple[2]])
    }

    public getResult(): LcgCrackResult {
        return {
            multiplier: this.multiplier,
            incrementer: this.incrementer,
        }
    }

    private calculateMultiplier(
        [x1, x2, x3]: [bigint, bigint, bigint],
    ): bigint {
        return mod(((x2 - x3) * this.calculateModInverse(x1 - x2)), this.modulo)
    }

    private calculateModInverse(a: bigint): bigint {
        const { x, gcd } = this.calculateGCD(a, this.modulo)
        if (gcd !== BigInt(1)) throw new Error("Modular inverse does not exists")
        return x
    }

    public calculateGCD(a: bigint, b: bigint) {
        let x: bigint
        let y: bigint
        let yTemp: bigint

        const helper = (a: bigint, b: bigint): bigint => {
            if (b === BigInt(0)) {
                y = BigInt(0)
                x = BigInt(1)
                return a
            }
            const gcd = helper(b, mod(a, b))
            yTemp = y
            y = (x - BigInt(Math.floor(parseInt((a / b).toString()))) * y)
            x = yTemp
            return gcd
        }

        const gcd = helper(a, b)
        return { gcd, x, y }
    }

    private calculateIncrementer(
        [x2, x3]: [bigint, bigint],
    ): bigint {
        const res = ((x3 - this.multiplier) * x2)
        return mod(x3 - this.multiplier * x2, this.modulo)
    }
}
