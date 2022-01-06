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