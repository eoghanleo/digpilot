import * as snowflake from 'snowflake-sdk'

// Connection pool
let connectionPool: any = null

function getConnection() {
  if (!connectionPool) {
    connectionPool = snowflake.createPool(
      {
        account:           process.env.SNOWFLAKE_ACCOUNT!,
        username:          process.env.SNOWFLAKE_USER!,
        authenticator:     process.env.SNOWFLAKE_AUTHENTICATOR!,     
        privateKeyPath:    process.env.SNOWFLAKE_PRIVATE_KEY_PATH!,   
        warehouse:         process.env.SNOWFLAKE_WAREHOUSE!,
        database:          process.env.SNOWFLAKE_DATABASE!,
        schema:            process.env.SNOWFLAKE_SCHEMA!,
        role:              process.env.SNOWFLAKE_ROLE!,
      },
      {
        max: 10,
        min: 0,
      }
    )
  }
  return connectionPool
}

export async function embedText(text: string): Promise<number[]> {
  return new Promise((resolve, reject) => {
    const pool = getConnection()
    pool.use(async (connection: any) => {
      connection.execute({
        sqlText: `SELECT SNOWFLAKE.CORTEX.EMBED_TEXT_1024('SNOWFLAKE-ARCTIC-EMBED-L-V2.0', ?) AS embedding`,
        binds:   [text],
        complete: (err, _stmt, rows) => {
          if (err) reject(err)
          else      resolve(rows[0].EMBEDDING)
        }
      })
    })
  })
}

export async function searchSnowflake(
  embedding: number[],
  propertyId: number,
  chunkType: 'safety' | 'operational'
): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const pool = getConnection()
    pool.use(async (connection: any) => {
      // Switch to the warehouse:
      await new Promise((res, rej) => {
        connection.execute({
          sqlText:  'USE WAREHOUSE RETRIEVAL',
          complete: (err) => err ? rej(err) : res(null)
        })
      })

      const query = `
        SELECT
          CHUNK             AS snippet,
          CHUNK_INDEX       AS chunk_index,
          RELATIVE_PATH     AS path,
          VECTOR_COSINE_SIMILARITY(
            LABEL_EMBED,
            ?::VECTOR(FLOAT, 1024)
          ) AS similarity,
          ?                 AS search_type
        FROM TEST_DB.CORTEX.RAW_TEXT
        WHERE PROPERTY_ID = ?
          AND label_embed IS NOT NULL
          AND chunk_type = ?
          AND VECTOR_COSINE_SIMILARITY(
            LABEL_EMBED,
            ?::VECTOR(FLOAT, 1024)
          ) >= 0.2
        ORDER BY similarity DESC
        LIMIT 5
      `
      connection.execute({
        sqlText: query,
        binds: [
          JSON.stringify(embedding),
          chunkType,
          propertyId,
          chunkType,
          JSON.stringify(embedding)
        ],
        complete: (err, _stmt, rows) => {
          if (err) reject(err)
          else      resolve(rows || [])
        }
      })
    })
  })
}
