import { QueryConfig, QueryResult } from "../types/query.types"

export interface IDbService {
    query(queryConfig: QueryConfig): Promise<QueryResult>
}

export const DbServiceInjectKey = "DbService"
