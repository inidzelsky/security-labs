import request from "./request"
import { HttpMethod } from "./types/request.types"

export class CasinoRoyale {
    private playerId: string

    public async init(playerId: string) {
        // TODO: Handle player already exists exception
        await this.registerPlayer(playerId)
        this.playerId = playerId
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
