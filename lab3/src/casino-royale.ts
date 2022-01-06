import request from "./request"
import { PlayPayload } from "./types/casino.types"
import { HttpMethod } from "./types/request.types"

interface ICasinoVisitor {
    crack(casino: CasinoRoyale): Promise<void>
}

export class CasinoRoyale {
    private playerId: string

    public async init(playerId: string): Promise<void> {
        if (this.playerId) return
        // TODO: Handle player already exists exception
        await this.registerPlayer(playerId)
        this.playerId = playerId
    }

    public async visit(visitor: ICasinoVisitor) {
        await visitor.crack(this)
    }

    public async play({ mode, amount, number }: PlayPayload) {
        const response = await request({
            url: `${process.env.BASE_URL}/casino/play${mode}`,
            method: HttpMethod.GET,
            query: {
                id: this.playerId,
                bet: amount.toString(),
                number: number.toString(),
            },
        })

        console.log(response)
    }

    private async registerPlayer(playerId: string) {
        const response = await request({
            url: `${process.env.BASE_URL}/casino/createacc`,
            method: HttpMethod.GET,
            query: {
                id: playerId,
            }
        })

        console.log(response)
    }
}
