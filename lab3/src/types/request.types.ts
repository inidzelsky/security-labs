export enum HttpMethod {
    GET = "GET",
}

export type RequestOptions = {
    url: string
    method: HttpMethod
    query: Record<string, string | string[]>
}

export type ResponsePayload<T = unknown> = {
    statusCode: number
    body: T
}
