import request from "./request"
import { PlayPayload, PlayRawResult, PlayResult } from "./types/casino.types"
import { HttpMethod } from "./types/request.types"
import { ICasinoVisitor } from "./interfaces/casino-visitor.interface"

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

    public async play({ mode, amount, number }: PlayPayload): Promise<PlayResult> {
        const { statusCode, body } = await request<PlayRawResult>({
            url: `${process.env.BASE_URL}/casino/play${mode}`,
            method: HttpMethod.GET,
            query: {
                id: this.playerId,
                bet: amount.toString(),
                number: number.toString(),
            },
        })

        const { account: { deletionTime, ...account }, ...result } = body

        return {
            ...result,
            account: {
                ...account,
                deletionTime: new Date(deletionTime),
            },
        }
    }

    private async registerPlayer(playerId: string) {
        const response = await request({
            url: `${process.env.BASE_URL}/casino/createacc`,
            method: HttpMethod.GET,
            query: {
                id: playerId,
            }
        })
    }
}
