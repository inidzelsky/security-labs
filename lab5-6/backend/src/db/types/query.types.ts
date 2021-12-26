export type QueryConfig = {
    text: string
    params: unknown[]
}

export type QueryResult = {
    rows: Record<string, unknown>[]
}