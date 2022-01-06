import { request } from "undici"
import { RequestOptions, ResponsePayload } from "./types/request.types"
import { URL, URLSearchParams } from "url"

export default async <T>(
    { url, query, method }: RequestOptions,
): Promise<ResponsePayload<T>> => {
    const queryString = new URLSearchParams(query).toString()
    const requestUrl = new URL(url)
    requestUrl.search = queryString

    const { statusCode, body } = await request(requestUrl, {
        method,
    })

    const parsedBody = await body.json()
    return {
        statusCode,
        body: parsedBody,
    }
}
