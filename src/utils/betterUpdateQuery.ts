import { Cache, QueryInput } from "@urql/exchange-graphcache";

export function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  fn: (r: Result, q: Query) => Query) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any); // eslint-disable-line @typescript-eslint/no-explicit-any
}
