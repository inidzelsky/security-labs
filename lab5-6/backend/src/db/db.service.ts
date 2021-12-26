import { Injectable } from "@nestjs/common"
import { Pool, PoolClient } from "pg"
import { IDbService } from "./interfaces/db-service.interface"
import { QueryConfig, QueryResult } from "./types/query.types"

@Injectable()
export class PostgresDbService implements IDbService {
    private static instance: PostgresDbService
    private readonly poolClient: PoolClient

    public static async init(poolConfig: Pool): Promise<PostgresDbService> {
        if (this.instance) return this.instance
        
        const poolClient = await poolConfig.connect()
        this.instance = new PostgresDbService(poolClient)

        return this.instance
    }

    private constructor(poolClient: PoolClient) {
        this.poolClient = poolClient
    }

    public query({ text, params }: QueryConfig): Promise<QueryResult> {
        return this.poolClient.query({
            text,
            values: params,
        }).then(({ rows }) => ({ rows }))
    }
}
