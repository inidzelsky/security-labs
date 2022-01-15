export enum PlayMode {
    Lcg = "Lcg",
    Mt = "Mt",
    BetterMt = "BetterMt",
}

export type PlayPayload = {
    mode: PlayMode
    amount: number
    number: number
}

type PlayerRawAccount = {
    id: string
    money: number
    deletionTime: string
}

export type PlayRawResult = {
    message: string
    account: {
        id: string
        money: number
        deletionTime: string
    }
    realNumber: number
}

export type PlayResult = Omit<PlayRawResult, "account"> & { 
    account: Omit<PlayerRawAccount, "deletionTime"> & { deletionTime: Date }
}
