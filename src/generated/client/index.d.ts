
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model MasterTrack
 * 
 */
export type MasterTrack = $Result.DefaultSelection<Prisma.$MasterTrackPayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more MasterTracks
 * const masterTracks = await prisma.masterTrack.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more MasterTracks
   * const masterTracks = await prisma.masterTrack.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.masterTrack`: Exposes CRUD operations for the **MasterTrack** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MasterTracks
    * const masterTracks = await prisma.masterTrack.findMany()
    * ```
    */
  get masterTrack(): Prisma.MasterTrackDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.9.1
   * Query Engine version: e922089b7d7502aff4249d5da3420f6fa55fc6ad
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    MasterTrack: 'MasterTrack',
    Transaction: 'Transaction'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "masterTrack" | "transaction"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      MasterTrack: {
        payload: Prisma.$MasterTrackPayload<ExtArgs>
        fields: Prisma.MasterTrackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MasterTrackFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterTrackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MasterTrackFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterTrackPayload>
          }
          findFirst: {
            args: Prisma.MasterTrackFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterTrackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MasterTrackFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterTrackPayload>
          }
          findMany: {
            args: Prisma.MasterTrackFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterTrackPayload>[]
          }
          create: {
            args: Prisma.MasterTrackCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterTrackPayload>
          }
          createMany: {
            args: Prisma.MasterTrackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MasterTrackCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterTrackPayload>[]
          }
          delete: {
            args: Prisma.MasterTrackDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterTrackPayload>
          }
          update: {
            args: Prisma.MasterTrackUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterTrackPayload>
          }
          deleteMany: {
            args: Prisma.MasterTrackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MasterTrackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MasterTrackUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterTrackPayload>[]
          }
          upsert: {
            args: Prisma.MasterTrackUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasterTrackPayload>
          }
          aggregate: {
            args: Prisma.MasterTrackAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMasterTrack>
          }
          groupBy: {
            args: Prisma.MasterTrackGroupByArgs<ExtArgs>
            result: $Utils.Optional<MasterTrackGroupByOutputType>[]
          }
          count: {
            args: Prisma.MasterTrackCountArgs<ExtArgs>
            result: $Utils.Optional<MasterTrackCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    masterTrack?: MasterTrackOmit
    transaction?: TransactionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type MasterTrackCountOutputType
   */

  export type MasterTrackCountOutputType = {
    sales: number
  }

  export type MasterTrackCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sales?: boolean | MasterTrackCountOutputTypeCountSalesArgs
  }

  // Custom InputTypes
  /**
   * MasterTrackCountOutputType without action
   */
  export type MasterTrackCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterTrackCountOutputType
     */
    select?: MasterTrackCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MasterTrackCountOutputType without action
   */
  export type MasterTrackCountOutputTypeCountSalesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model MasterTrack
   */

  export type AggregateMasterTrack = {
    _count: MasterTrackCountAggregateOutputType | null
    _avg: MasterTrackAvgAggregateOutputType | null
    _sum: MasterTrackSumAggregateOutputType | null
    _min: MasterTrackMinAggregateOutputType | null
    _max: MasterTrackMaxAggregateOutputType | null
  }

  export type MasterTrackAvgAggregateOutputType = {
    bpm: number | null
    priceMp3: number | null
    priceWav: number | null
    priceStems: number | null
    priceExclusive: number | null
    playCount: number | null
    downloadCount: number | null
  }

  export type MasterTrackSumAggregateOutputType = {
    bpm: number | null
    priceMp3: number | null
    priceWav: number | null
    priceStems: number | null
    priceExclusive: number | null
    playCount: number | null
    downloadCount: number | null
  }

  export type MasterTrackMinAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    bpm: number | null
    musicalKey: string | null
    genre: string | null
    subGenre: string | null
    taggedMp3Url: string | null
    untaggedWavUrl: string | null
    stemsZipUrl: string | null
    coverArtUrl: string | null
    priceMp3: number | null
    priceWav: number | null
    priceStems: number | null
    priceExclusive: number | null
    isExclusiveSold: boolean | null
    isVaultLocked: boolean | null
    playCount: number | null
    downloadCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MasterTrackMaxAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    bpm: number | null
    musicalKey: string | null
    genre: string | null
    subGenre: string | null
    taggedMp3Url: string | null
    untaggedWavUrl: string | null
    stemsZipUrl: string | null
    coverArtUrl: string | null
    priceMp3: number | null
    priceWav: number | null
    priceStems: number | null
    priceExclusive: number | null
    isExclusiveSold: boolean | null
    isVaultLocked: boolean | null
    playCount: number | null
    downloadCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MasterTrackCountAggregateOutputType = {
    id: number
    title: number
    slug: number
    bpm: number
    musicalKey: number
    genre: number
    subGenre: number
    moodTags: number
    taggedMp3Url: number
    untaggedWavUrl: number
    stemsZipUrl: number
    coverArtUrl: number
    priceMp3: number
    priceWav: number
    priceStems: number
    priceExclusive: number
    isExclusiveSold: number
    isVaultLocked: number
    playCount: number
    downloadCount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MasterTrackAvgAggregateInputType = {
    bpm?: true
    priceMp3?: true
    priceWav?: true
    priceStems?: true
    priceExclusive?: true
    playCount?: true
    downloadCount?: true
  }

  export type MasterTrackSumAggregateInputType = {
    bpm?: true
    priceMp3?: true
    priceWav?: true
    priceStems?: true
    priceExclusive?: true
    playCount?: true
    downloadCount?: true
  }

  export type MasterTrackMinAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    bpm?: true
    musicalKey?: true
    genre?: true
    subGenre?: true
    taggedMp3Url?: true
    untaggedWavUrl?: true
    stemsZipUrl?: true
    coverArtUrl?: true
    priceMp3?: true
    priceWav?: true
    priceStems?: true
    priceExclusive?: true
    isExclusiveSold?: true
    isVaultLocked?: true
    playCount?: true
    downloadCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MasterTrackMaxAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    bpm?: true
    musicalKey?: true
    genre?: true
    subGenre?: true
    taggedMp3Url?: true
    untaggedWavUrl?: true
    stemsZipUrl?: true
    coverArtUrl?: true
    priceMp3?: true
    priceWav?: true
    priceStems?: true
    priceExclusive?: true
    isExclusiveSold?: true
    isVaultLocked?: true
    playCount?: true
    downloadCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MasterTrackCountAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    bpm?: true
    musicalKey?: true
    genre?: true
    subGenre?: true
    moodTags?: true
    taggedMp3Url?: true
    untaggedWavUrl?: true
    stemsZipUrl?: true
    coverArtUrl?: true
    priceMp3?: true
    priceWav?: true
    priceStems?: true
    priceExclusive?: true
    isExclusiveSold?: true
    isVaultLocked?: true
    playCount?: true
    downloadCount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MasterTrackAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MasterTrack to aggregate.
     */
    where?: MasterTrackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasterTracks to fetch.
     */
    orderBy?: MasterTrackOrderByWithRelationInput | MasterTrackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MasterTrackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasterTracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasterTracks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MasterTracks
    **/
    _count?: true | MasterTrackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MasterTrackAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MasterTrackSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MasterTrackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MasterTrackMaxAggregateInputType
  }

  export type GetMasterTrackAggregateType<T extends MasterTrackAggregateArgs> = {
        [P in keyof T & keyof AggregateMasterTrack]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMasterTrack[P]>
      : GetScalarType<T[P], AggregateMasterTrack[P]>
  }




  export type MasterTrackGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MasterTrackWhereInput
    orderBy?: MasterTrackOrderByWithAggregationInput | MasterTrackOrderByWithAggregationInput[]
    by: MasterTrackScalarFieldEnum[] | MasterTrackScalarFieldEnum
    having?: MasterTrackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MasterTrackCountAggregateInputType | true
    _avg?: MasterTrackAvgAggregateInputType
    _sum?: MasterTrackSumAggregateInputType
    _min?: MasterTrackMinAggregateInputType
    _max?: MasterTrackMaxAggregateInputType
  }

  export type MasterTrackGroupByOutputType = {
    id: string
    title: string
    slug: string
    bpm: number
    musicalKey: string
    genre: string
    subGenre: string | null
    moodTags: string[]
    taggedMp3Url: string
    untaggedWavUrl: string
    stemsZipUrl: string
    coverArtUrl: string
    priceMp3: number
    priceWav: number
    priceStems: number
    priceExclusive: number
    isExclusiveSold: boolean
    isVaultLocked: boolean
    playCount: number
    downloadCount: number
    createdAt: Date
    updatedAt: Date
    _count: MasterTrackCountAggregateOutputType | null
    _avg: MasterTrackAvgAggregateOutputType | null
    _sum: MasterTrackSumAggregateOutputType | null
    _min: MasterTrackMinAggregateOutputType | null
    _max: MasterTrackMaxAggregateOutputType | null
  }

  type GetMasterTrackGroupByPayload<T extends MasterTrackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MasterTrackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MasterTrackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MasterTrackGroupByOutputType[P]>
            : GetScalarType<T[P], MasterTrackGroupByOutputType[P]>
        }
      >
    >


  export type MasterTrackSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    bpm?: boolean
    musicalKey?: boolean
    genre?: boolean
    subGenre?: boolean
    moodTags?: boolean
    taggedMp3Url?: boolean
    untaggedWavUrl?: boolean
    stemsZipUrl?: boolean
    coverArtUrl?: boolean
    priceMp3?: boolean
    priceWav?: boolean
    priceStems?: boolean
    priceExclusive?: boolean
    isExclusiveSold?: boolean
    isVaultLocked?: boolean
    playCount?: boolean
    downloadCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sales?: boolean | MasterTrack$salesArgs<ExtArgs>
    _count?: boolean | MasterTrackCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["masterTrack"]>

  export type MasterTrackSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    bpm?: boolean
    musicalKey?: boolean
    genre?: boolean
    subGenre?: boolean
    moodTags?: boolean
    taggedMp3Url?: boolean
    untaggedWavUrl?: boolean
    stemsZipUrl?: boolean
    coverArtUrl?: boolean
    priceMp3?: boolean
    priceWav?: boolean
    priceStems?: boolean
    priceExclusive?: boolean
    isExclusiveSold?: boolean
    isVaultLocked?: boolean
    playCount?: boolean
    downloadCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["masterTrack"]>

  export type MasterTrackSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    bpm?: boolean
    musicalKey?: boolean
    genre?: boolean
    subGenre?: boolean
    moodTags?: boolean
    taggedMp3Url?: boolean
    untaggedWavUrl?: boolean
    stemsZipUrl?: boolean
    coverArtUrl?: boolean
    priceMp3?: boolean
    priceWav?: boolean
    priceStems?: boolean
    priceExclusive?: boolean
    isExclusiveSold?: boolean
    isVaultLocked?: boolean
    playCount?: boolean
    downloadCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["masterTrack"]>

  export type MasterTrackSelectScalar = {
    id?: boolean
    title?: boolean
    slug?: boolean
    bpm?: boolean
    musicalKey?: boolean
    genre?: boolean
    subGenre?: boolean
    moodTags?: boolean
    taggedMp3Url?: boolean
    untaggedWavUrl?: boolean
    stemsZipUrl?: boolean
    coverArtUrl?: boolean
    priceMp3?: boolean
    priceWav?: boolean
    priceStems?: boolean
    priceExclusive?: boolean
    isExclusiveSold?: boolean
    isVaultLocked?: boolean
    playCount?: boolean
    downloadCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MasterTrackOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "slug" | "bpm" | "musicalKey" | "genre" | "subGenre" | "moodTags" | "taggedMp3Url" | "untaggedWavUrl" | "stemsZipUrl" | "coverArtUrl" | "priceMp3" | "priceWav" | "priceStems" | "priceExclusive" | "isExclusiveSold" | "isVaultLocked" | "playCount" | "downloadCount" | "createdAt" | "updatedAt", ExtArgs["result"]["masterTrack"]>
  export type MasterTrackInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sales?: boolean | MasterTrack$salesArgs<ExtArgs>
    _count?: boolean | MasterTrackCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MasterTrackIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MasterTrackIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MasterTrackPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MasterTrack"
    objects: {
      sales: Prisma.$TransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      slug: string
      bpm: number
      musicalKey: string
      genre: string
      subGenre: string | null
      moodTags: string[]
      taggedMp3Url: string
      untaggedWavUrl: string
      stemsZipUrl: string
      coverArtUrl: string
      priceMp3: number
      priceWav: number
      priceStems: number
      priceExclusive: number
      isExclusiveSold: boolean
      isVaultLocked: boolean
      playCount: number
      downloadCount: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["masterTrack"]>
    composites: {}
  }

  type MasterTrackGetPayload<S extends boolean | null | undefined | MasterTrackDefaultArgs> = $Result.GetResult<Prisma.$MasterTrackPayload, S>

  type MasterTrackCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MasterTrackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MasterTrackCountAggregateInputType | true
    }

  export interface MasterTrackDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MasterTrack'], meta: { name: 'MasterTrack' } }
    /**
     * Find zero or one MasterTrack that matches the filter.
     * @param {MasterTrackFindUniqueArgs} args - Arguments to find a MasterTrack
     * @example
     * // Get one MasterTrack
     * const masterTrack = await prisma.masterTrack.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MasterTrackFindUniqueArgs>(args: SelectSubset<T, MasterTrackFindUniqueArgs<ExtArgs>>): Prisma__MasterTrackClient<$Result.GetResult<Prisma.$MasterTrackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MasterTrack that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MasterTrackFindUniqueOrThrowArgs} args - Arguments to find a MasterTrack
     * @example
     * // Get one MasterTrack
     * const masterTrack = await prisma.masterTrack.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MasterTrackFindUniqueOrThrowArgs>(args: SelectSubset<T, MasterTrackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MasterTrackClient<$Result.GetResult<Prisma.$MasterTrackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MasterTrack that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterTrackFindFirstArgs} args - Arguments to find a MasterTrack
     * @example
     * // Get one MasterTrack
     * const masterTrack = await prisma.masterTrack.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MasterTrackFindFirstArgs>(args?: SelectSubset<T, MasterTrackFindFirstArgs<ExtArgs>>): Prisma__MasterTrackClient<$Result.GetResult<Prisma.$MasterTrackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MasterTrack that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterTrackFindFirstOrThrowArgs} args - Arguments to find a MasterTrack
     * @example
     * // Get one MasterTrack
     * const masterTrack = await prisma.masterTrack.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MasterTrackFindFirstOrThrowArgs>(args?: SelectSubset<T, MasterTrackFindFirstOrThrowArgs<ExtArgs>>): Prisma__MasterTrackClient<$Result.GetResult<Prisma.$MasterTrackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MasterTracks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterTrackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MasterTracks
     * const masterTracks = await prisma.masterTrack.findMany()
     * 
     * // Get first 10 MasterTracks
     * const masterTracks = await prisma.masterTrack.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const masterTrackWithIdOnly = await prisma.masterTrack.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MasterTrackFindManyArgs>(args?: SelectSubset<T, MasterTrackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MasterTrackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MasterTrack.
     * @param {MasterTrackCreateArgs} args - Arguments to create a MasterTrack.
     * @example
     * // Create one MasterTrack
     * const MasterTrack = await prisma.masterTrack.create({
     *   data: {
     *     // ... data to create a MasterTrack
     *   }
     * })
     * 
     */
    create<T extends MasterTrackCreateArgs>(args: SelectSubset<T, MasterTrackCreateArgs<ExtArgs>>): Prisma__MasterTrackClient<$Result.GetResult<Prisma.$MasterTrackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MasterTracks.
     * @param {MasterTrackCreateManyArgs} args - Arguments to create many MasterTracks.
     * @example
     * // Create many MasterTracks
     * const masterTrack = await prisma.masterTrack.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MasterTrackCreateManyArgs>(args?: SelectSubset<T, MasterTrackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MasterTracks and returns the data saved in the database.
     * @param {MasterTrackCreateManyAndReturnArgs} args - Arguments to create many MasterTracks.
     * @example
     * // Create many MasterTracks
     * const masterTrack = await prisma.masterTrack.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MasterTracks and only return the `id`
     * const masterTrackWithIdOnly = await prisma.masterTrack.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MasterTrackCreateManyAndReturnArgs>(args?: SelectSubset<T, MasterTrackCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MasterTrackPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MasterTrack.
     * @param {MasterTrackDeleteArgs} args - Arguments to delete one MasterTrack.
     * @example
     * // Delete one MasterTrack
     * const MasterTrack = await prisma.masterTrack.delete({
     *   where: {
     *     // ... filter to delete one MasterTrack
     *   }
     * })
     * 
     */
    delete<T extends MasterTrackDeleteArgs>(args: SelectSubset<T, MasterTrackDeleteArgs<ExtArgs>>): Prisma__MasterTrackClient<$Result.GetResult<Prisma.$MasterTrackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MasterTrack.
     * @param {MasterTrackUpdateArgs} args - Arguments to update one MasterTrack.
     * @example
     * // Update one MasterTrack
     * const masterTrack = await prisma.masterTrack.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MasterTrackUpdateArgs>(args: SelectSubset<T, MasterTrackUpdateArgs<ExtArgs>>): Prisma__MasterTrackClient<$Result.GetResult<Prisma.$MasterTrackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MasterTracks.
     * @param {MasterTrackDeleteManyArgs} args - Arguments to filter MasterTracks to delete.
     * @example
     * // Delete a few MasterTracks
     * const { count } = await prisma.masterTrack.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MasterTrackDeleteManyArgs>(args?: SelectSubset<T, MasterTrackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MasterTracks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterTrackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MasterTracks
     * const masterTrack = await prisma.masterTrack.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MasterTrackUpdateManyArgs>(args: SelectSubset<T, MasterTrackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MasterTracks and returns the data updated in the database.
     * @param {MasterTrackUpdateManyAndReturnArgs} args - Arguments to update many MasterTracks.
     * @example
     * // Update many MasterTracks
     * const masterTrack = await prisma.masterTrack.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MasterTracks and only return the `id`
     * const masterTrackWithIdOnly = await prisma.masterTrack.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MasterTrackUpdateManyAndReturnArgs>(args: SelectSubset<T, MasterTrackUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MasterTrackPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MasterTrack.
     * @param {MasterTrackUpsertArgs} args - Arguments to update or create a MasterTrack.
     * @example
     * // Update or create a MasterTrack
     * const masterTrack = await prisma.masterTrack.upsert({
     *   create: {
     *     // ... data to create a MasterTrack
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MasterTrack we want to update
     *   }
     * })
     */
    upsert<T extends MasterTrackUpsertArgs>(args: SelectSubset<T, MasterTrackUpsertArgs<ExtArgs>>): Prisma__MasterTrackClient<$Result.GetResult<Prisma.$MasterTrackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MasterTracks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterTrackCountArgs} args - Arguments to filter MasterTracks to count.
     * @example
     * // Count the number of MasterTracks
     * const count = await prisma.masterTrack.count({
     *   where: {
     *     // ... the filter for the MasterTracks we want to count
     *   }
     * })
    **/
    count<T extends MasterTrackCountArgs>(
      args?: Subset<T, MasterTrackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MasterTrackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MasterTrack.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterTrackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MasterTrackAggregateArgs>(args: Subset<T, MasterTrackAggregateArgs>): Prisma.PrismaPromise<GetMasterTrackAggregateType<T>>

    /**
     * Group by MasterTrack.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterTrackGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MasterTrackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MasterTrackGroupByArgs['orderBy'] }
        : { orderBy?: MasterTrackGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MasterTrackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMasterTrackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MasterTrack model
   */
  readonly fields: MasterTrackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MasterTrack.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MasterTrackClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sales<T extends MasterTrack$salesArgs<ExtArgs> = {}>(args?: Subset<T, MasterTrack$salesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MasterTrack model
   */
  interface MasterTrackFieldRefs {
    readonly id: FieldRef<"MasterTrack", 'String'>
    readonly title: FieldRef<"MasterTrack", 'String'>
    readonly slug: FieldRef<"MasterTrack", 'String'>
    readonly bpm: FieldRef<"MasterTrack", 'Int'>
    readonly musicalKey: FieldRef<"MasterTrack", 'String'>
    readonly genre: FieldRef<"MasterTrack", 'String'>
    readonly subGenre: FieldRef<"MasterTrack", 'String'>
    readonly moodTags: FieldRef<"MasterTrack", 'String[]'>
    readonly taggedMp3Url: FieldRef<"MasterTrack", 'String'>
    readonly untaggedWavUrl: FieldRef<"MasterTrack", 'String'>
    readonly stemsZipUrl: FieldRef<"MasterTrack", 'String'>
    readonly coverArtUrl: FieldRef<"MasterTrack", 'String'>
    readonly priceMp3: FieldRef<"MasterTrack", 'Float'>
    readonly priceWav: FieldRef<"MasterTrack", 'Float'>
    readonly priceStems: FieldRef<"MasterTrack", 'Float'>
    readonly priceExclusive: FieldRef<"MasterTrack", 'Float'>
    readonly isExclusiveSold: FieldRef<"MasterTrack", 'Boolean'>
    readonly isVaultLocked: FieldRef<"MasterTrack", 'Boolean'>
    readonly playCount: FieldRef<"MasterTrack", 'Int'>
    readonly downloadCount: FieldRef<"MasterTrack", 'Int'>
    readonly createdAt: FieldRef<"MasterTrack", 'DateTime'>
    readonly updatedAt: FieldRef<"MasterTrack", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MasterTrack findUnique
   */
  export type MasterTrackFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterTrack
     */
    select?: MasterTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasterTrack
     */
    omit?: MasterTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterTrackInclude<ExtArgs> | null
    /**
     * Filter, which MasterTrack to fetch.
     */
    where: MasterTrackWhereUniqueInput
  }

  /**
   * MasterTrack findUniqueOrThrow
   */
  export type MasterTrackFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterTrack
     */
    select?: MasterTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasterTrack
     */
    omit?: MasterTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterTrackInclude<ExtArgs> | null
    /**
     * Filter, which MasterTrack to fetch.
     */
    where: MasterTrackWhereUniqueInput
  }

  /**
   * MasterTrack findFirst
   */
  export type MasterTrackFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterTrack
     */
    select?: MasterTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasterTrack
     */
    omit?: MasterTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterTrackInclude<ExtArgs> | null
    /**
     * Filter, which MasterTrack to fetch.
     */
    where?: MasterTrackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasterTracks to fetch.
     */
    orderBy?: MasterTrackOrderByWithRelationInput | MasterTrackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MasterTracks.
     */
    cursor?: MasterTrackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasterTracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasterTracks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MasterTracks.
     */
    distinct?: MasterTrackScalarFieldEnum | MasterTrackScalarFieldEnum[]
  }

  /**
   * MasterTrack findFirstOrThrow
   */
  export type MasterTrackFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterTrack
     */
    select?: MasterTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasterTrack
     */
    omit?: MasterTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterTrackInclude<ExtArgs> | null
    /**
     * Filter, which MasterTrack to fetch.
     */
    where?: MasterTrackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasterTracks to fetch.
     */
    orderBy?: MasterTrackOrderByWithRelationInput | MasterTrackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MasterTracks.
     */
    cursor?: MasterTrackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasterTracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasterTracks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MasterTracks.
     */
    distinct?: MasterTrackScalarFieldEnum | MasterTrackScalarFieldEnum[]
  }

  /**
   * MasterTrack findMany
   */
  export type MasterTrackFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterTrack
     */
    select?: MasterTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasterTrack
     */
    omit?: MasterTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterTrackInclude<ExtArgs> | null
    /**
     * Filter, which MasterTracks to fetch.
     */
    where?: MasterTrackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasterTracks to fetch.
     */
    orderBy?: MasterTrackOrderByWithRelationInput | MasterTrackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MasterTracks.
     */
    cursor?: MasterTrackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasterTracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasterTracks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MasterTracks.
     */
    distinct?: MasterTrackScalarFieldEnum | MasterTrackScalarFieldEnum[]
  }

  /**
   * MasterTrack create
   */
  export type MasterTrackCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterTrack
     */
    select?: MasterTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasterTrack
     */
    omit?: MasterTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterTrackInclude<ExtArgs> | null
    /**
     * The data needed to create a MasterTrack.
     */
    data: XOR<MasterTrackCreateInput, MasterTrackUncheckedCreateInput>
  }

  /**
   * MasterTrack createMany
   */
  export type MasterTrackCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MasterTracks.
     */
    data: MasterTrackCreateManyInput | MasterTrackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MasterTrack createManyAndReturn
   */
  export type MasterTrackCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterTrack
     */
    select?: MasterTrackSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MasterTrack
     */
    omit?: MasterTrackOmit<ExtArgs> | null
    /**
     * The data used to create many MasterTracks.
     */
    data: MasterTrackCreateManyInput | MasterTrackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MasterTrack update
   */
  export type MasterTrackUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterTrack
     */
    select?: MasterTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasterTrack
     */
    omit?: MasterTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterTrackInclude<ExtArgs> | null
    /**
     * The data needed to update a MasterTrack.
     */
    data: XOR<MasterTrackUpdateInput, MasterTrackUncheckedUpdateInput>
    /**
     * Choose, which MasterTrack to update.
     */
    where: MasterTrackWhereUniqueInput
  }

  /**
   * MasterTrack updateMany
   */
  export type MasterTrackUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MasterTracks.
     */
    data: XOR<MasterTrackUpdateManyMutationInput, MasterTrackUncheckedUpdateManyInput>
    /**
     * Filter which MasterTracks to update
     */
    where?: MasterTrackWhereInput
    /**
     * Limit how many MasterTracks to update.
     */
    limit?: number
  }

  /**
   * MasterTrack updateManyAndReturn
   */
  export type MasterTrackUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterTrack
     */
    select?: MasterTrackSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MasterTrack
     */
    omit?: MasterTrackOmit<ExtArgs> | null
    /**
     * The data used to update MasterTracks.
     */
    data: XOR<MasterTrackUpdateManyMutationInput, MasterTrackUncheckedUpdateManyInput>
    /**
     * Filter which MasterTracks to update
     */
    where?: MasterTrackWhereInput
    /**
     * Limit how many MasterTracks to update.
     */
    limit?: number
  }

  /**
   * MasterTrack upsert
   */
  export type MasterTrackUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterTrack
     */
    select?: MasterTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasterTrack
     */
    omit?: MasterTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterTrackInclude<ExtArgs> | null
    /**
     * The filter to search for the MasterTrack to update in case it exists.
     */
    where: MasterTrackWhereUniqueInput
    /**
     * In case the MasterTrack found by the `where` argument doesn't exist, create a new MasterTrack with this data.
     */
    create: XOR<MasterTrackCreateInput, MasterTrackUncheckedCreateInput>
    /**
     * In case the MasterTrack was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MasterTrackUpdateInput, MasterTrackUncheckedUpdateInput>
  }

  /**
   * MasterTrack delete
   */
  export type MasterTrackDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterTrack
     */
    select?: MasterTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasterTrack
     */
    omit?: MasterTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterTrackInclude<ExtArgs> | null
    /**
     * Filter which MasterTrack to delete.
     */
    where: MasterTrackWhereUniqueInput
  }

  /**
   * MasterTrack deleteMany
   */
  export type MasterTrackDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MasterTracks to delete
     */
    where?: MasterTrackWhereInput
    /**
     * Limit how many MasterTracks to delete.
     */
    limit?: number
  }

  /**
   * MasterTrack.sales
   */
  export type MasterTrack$salesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * MasterTrack without action
   */
  export type MasterTrackDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasterTrack
     */
    select?: MasterTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasterTrack
     */
    omit?: MasterTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasterTrackInclude<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    amountPaid: number | null
  }

  export type TransactionSumAggregateOutputType = {
    amountPaid: number | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    trackId: string | null
    buyerEmail: string | null
    licenseType: string | null
    amountPaid: number | null
    paymentGateway: string | null
    licensePdfUrl: string | null
    createdAt: Date | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    trackId: string | null
    buyerEmail: string | null
    licenseType: string | null
    amountPaid: number | null
    paymentGateway: string | null
    licensePdfUrl: string | null
    createdAt: Date | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    trackId: number
    buyerEmail: number
    licenseType: number
    amountPaid: number
    paymentGateway: number
    licensePdfUrl: number
    createdAt: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    amountPaid?: true
  }

  export type TransactionSumAggregateInputType = {
    amountPaid?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    trackId?: true
    buyerEmail?: true
    licenseType?: true
    amountPaid?: true
    paymentGateway?: true
    licensePdfUrl?: true
    createdAt?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    trackId?: true
    buyerEmail?: true
    licenseType?: true
    amountPaid?: true
    paymentGateway?: true
    licensePdfUrl?: true
    createdAt?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    trackId?: true
    buyerEmail?: true
    licenseType?: true
    amountPaid?: true
    paymentGateway?: true
    licensePdfUrl?: true
    createdAt?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    trackId: string
    buyerEmail: string
    licenseType: string
    amountPaid: number
    paymentGateway: string
    licensePdfUrl: string
    createdAt: Date
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trackId?: boolean
    buyerEmail?: boolean
    licenseType?: boolean
    amountPaid?: boolean
    paymentGateway?: boolean
    licensePdfUrl?: boolean
    createdAt?: boolean
    track?: boolean | MasterTrackDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trackId?: boolean
    buyerEmail?: boolean
    licenseType?: boolean
    amountPaid?: boolean
    paymentGateway?: boolean
    licensePdfUrl?: boolean
    createdAt?: boolean
    track?: boolean | MasterTrackDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trackId?: boolean
    buyerEmail?: boolean
    licenseType?: boolean
    amountPaid?: boolean
    paymentGateway?: boolean
    licensePdfUrl?: boolean
    createdAt?: boolean
    track?: boolean | MasterTrackDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    id?: boolean
    trackId?: boolean
    buyerEmail?: boolean
    licenseType?: boolean
    amountPaid?: boolean
    paymentGateway?: boolean
    licensePdfUrl?: boolean
    createdAt?: boolean
  }

  export type TransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "trackId" | "buyerEmail" | "licenseType" | "amountPaid" | "paymentGateway" | "licensePdfUrl" | "createdAt", ExtArgs["result"]["transaction"]>
  export type TransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    track?: boolean | MasterTrackDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    track?: boolean | MasterTrackDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    track?: boolean | MasterTrackDefaultArgs<ExtArgs>
  }

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {
      track: Prisma.$MasterTrackPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      trackId: string
      buyerEmail: string
      licenseType: string
      amountPaid: number
      paymentGateway: string
      licensePdfUrl: string
      createdAt: Date
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {TransactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {TransactionUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, TransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    track<T extends MasterTrackDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MasterTrackDefaultArgs<ExtArgs>>): Prisma__MasterTrackClient<$Result.GetResult<Prisma.$MasterTrackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly trackId: FieldRef<"Transaction", 'String'>
    readonly buyerEmail: FieldRef<"Transaction", 'String'>
    readonly licenseType: FieldRef<"Transaction", 'String'>
    readonly amountPaid: FieldRef<"Transaction", 'Float'>
    readonly paymentGateway: FieldRef<"Transaction", 'String'>
    readonly licensePdfUrl: FieldRef<"Transaction", 'String'>
    readonly createdAt: FieldRef<"Transaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaction createManyAndReturn
   */
  export type TransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction updateManyAndReturn
   */
  export type TransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const MasterTrackScalarFieldEnum: {
    id: 'id',
    title: 'title',
    slug: 'slug',
    bpm: 'bpm',
    musicalKey: 'musicalKey',
    genre: 'genre',
    subGenre: 'subGenre',
    moodTags: 'moodTags',
    taggedMp3Url: 'taggedMp3Url',
    untaggedWavUrl: 'untaggedWavUrl',
    stemsZipUrl: 'stemsZipUrl',
    coverArtUrl: 'coverArtUrl',
    priceMp3: 'priceMp3',
    priceWav: 'priceWav',
    priceStems: 'priceStems',
    priceExclusive: 'priceExclusive',
    isExclusiveSold: 'isExclusiveSold',
    isVaultLocked: 'isVaultLocked',
    playCount: 'playCount',
    downloadCount: 'downloadCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MasterTrackScalarFieldEnum = (typeof MasterTrackScalarFieldEnum)[keyof typeof MasterTrackScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    trackId: 'trackId',
    buyerEmail: 'buyerEmail',
    licenseType: 'licenseType',
    amountPaid: 'amountPaid',
    paymentGateway: 'paymentGateway',
    licensePdfUrl: 'licensePdfUrl',
    createdAt: 'createdAt'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    
  /**
   * Deep Input Types
   */


  export type MasterTrackWhereInput = {
    AND?: MasterTrackWhereInput | MasterTrackWhereInput[]
    OR?: MasterTrackWhereInput[]
    NOT?: MasterTrackWhereInput | MasterTrackWhereInput[]
    id?: StringFilter<"MasterTrack"> | string
    title?: StringFilter<"MasterTrack"> | string
    slug?: StringFilter<"MasterTrack"> | string
    bpm?: IntFilter<"MasterTrack"> | number
    musicalKey?: StringFilter<"MasterTrack"> | string
    genre?: StringFilter<"MasterTrack"> | string
    subGenre?: StringNullableFilter<"MasterTrack"> | string | null
    moodTags?: StringNullableListFilter<"MasterTrack">
    taggedMp3Url?: StringFilter<"MasterTrack"> | string
    untaggedWavUrl?: StringFilter<"MasterTrack"> | string
    stemsZipUrl?: StringFilter<"MasterTrack"> | string
    coverArtUrl?: StringFilter<"MasterTrack"> | string
    priceMp3?: FloatFilter<"MasterTrack"> | number
    priceWav?: FloatFilter<"MasterTrack"> | number
    priceStems?: FloatFilter<"MasterTrack"> | number
    priceExclusive?: FloatFilter<"MasterTrack"> | number
    isExclusiveSold?: BoolFilter<"MasterTrack"> | boolean
    isVaultLocked?: BoolFilter<"MasterTrack"> | boolean
    playCount?: IntFilter<"MasterTrack"> | number
    downloadCount?: IntFilter<"MasterTrack"> | number
    createdAt?: DateTimeFilter<"MasterTrack"> | Date | string
    updatedAt?: DateTimeFilter<"MasterTrack"> | Date | string
    sales?: TransactionListRelationFilter
  }

  export type MasterTrackOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    bpm?: SortOrder
    musicalKey?: SortOrder
    genre?: SortOrder
    subGenre?: SortOrderInput | SortOrder
    moodTags?: SortOrder
    taggedMp3Url?: SortOrder
    untaggedWavUrl?: SortOrder
    stemsZipUrl?: SortOrder
    coverArtUrl?: SortOrder
    priceMp3?: SortOrder
    priceWav?: SortOrder
    priceStems?: SortOrder
    priceExclusive?: SortOrder
    isExclusiveSold?: SortOrder
    isVaultLocked?: SortOrder
    playCount?: SortOrder
    downloadCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sales?: TransactionOrderByRelationAggregateInput
  }

  export type MasterTrackWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: MasterTrackWhereInput | MasterTrackWhereInput[]
    OR?: MasterTrackWhereInput[]
    NOT?: MasterTrackWhereInput | MasterTrackWhereInput[]
    title?: StringFilter<"MasterTrack"> | string
    bpm?: IntFilter<"MasterTrack"> | number
    musicalKey?: StringFilter<"MasterTrack"> | string
    genre?: StringFilter<"MasterTrack"> | string
    subGenre?: StringNullableFilter<"MasterTrack"> | string | null
    moodTags?: StringNullableListFilter<"MasterTrack">
    taggedMp3Url?: StringFilter<"MasterTrack"> | string
    untaggedWavUrl?: StringFilter<"MasterTrack"> | string
    stemsZipUrl?: StringFilter<"MasterTrack"> | string
    coverArtUrl?: StringFilter<"MasterTrack"> | string
    priceMp3?: FloatFilter<"MasterTrack"> | number
    priceWav?: FloatFilter<"MasterTrack"> | number
    priceStems?: FloatFilter<"MasterTrack"> | number
    priceExclusive?: FloatFilter<"MasterTrack"> | number
    isExclusiveSold?: BoolFilter<"MasterTrack"> | boolean
    isVaultLocked?: BoolFilter<"MasterTrack"> | boolean
    playCount?: IntFilter<"MasterTrack"> | number
    downloadCount?: IntFilter<"MasterTrack"> | number
    createdAt?: DateTimeFilter<"MasterTrack"> | Date | string
    updatedAt?: DateTimeFilter<"MasterTrack"> | Date | string
    sales?: TransactionListRelationFilter
  }, "id" | "slug">

  export type MasterTrackOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    bpm?: SortOrder
    musicalKey?: SortOrder
    genre?: SortOrder
    subGenre?: SortOrderInput | SortOrder
    moodTags?: SortOrder
    taggedMp3Url?: SortOrder
    untaggedWavUrl?: SortOrder
    stemsZipUrl?: SortOrder
    coverArtUrl?: SortOrder
    priceMp3?: SortOrder
    priceWav?: SortOrder
    priceStems?: SortOrder
    priceExclusive?: SortOrder
    isExclusiveSold?: SortOrder
    isVaultLocked?: SortOrder
    playCount?: SortOrder
    downloadCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MasterTrackCountOrderByAggregateInput
    _avg?: MasterTrackAvgOrderByAggregateInput
    _max?: MasterTrackMaxOrderByAggregateInput
    _min?: MasterTrackMinOrderByAggregateInput
    _sum?: MasterTrackSumOrderByAggregateInput
  }

  export type MasterTrackScalarWhereWithAggregatesInput = {
    AND?: MasterTrackScalarWhereWithAggregatesInput | MasterTrackScalarWhereWithAggregatesInput[]
    OR?: MasterTrackScalarWhereWithAggregatesInput[]
    NOT?: MasterTrackScalarWhereWithAggregatesInput | MasterTrackScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MasterTrack"> | string
    title?: StringWithAggregatesFilter<"MasterTrack"> | string
    slug?: StringWithAggregatesFilter<"MasterTrack"> | string
    bpm?: IntWithAggregatesFilter<"MasterTrack"> | number
    musicalKey?: StringWithAggregatesFilter<"MasterTrack"> | string
    genre?: StringWithAggregatesFilter<"MasterTrack"> | string
    subGenre?: StringNullableWithAggregatesFilter<"MasterTrack"> | string | null
    moodTags?: StringNullableListFilter<"MasterTrack">
    taggedMp3Url?: StringWithAggregatesFilter<"MasterTrack"> | string
    untaggedWavUrl?: StringWithAggregatesFilter<"MasterTrack"> | string
    stemsZipUrl?: StringWithAggregatesFilter<"MasterTrack"> | string
    coverArtUrl?: StringWithAggregatesFilter<"MasterTrack"> | string
    priceMp3?: FloatWithAggregatesFilter<"MasterTrack"> | number
    priceWav?: FloatWithAggregatesFilter<"MasterTrack"> | number
    priceStems?: FloatWithAggregatesFilter<"MasterTrack"> | number
    priceExclusive?: FloatWithAggregatesFilter<"MasterTrack"> | number
    isExclusiveSold?: BoolWithAggregatesFilter<"MasterTrack"> | boolean
    isVaultLocked?: BoolWithAggregatesFilter<"MasterTrack"> | boolean
    playCount?: IntWithAggregatesFilter<"MasterTrack"> | number
    downloadCount?: IntWithAggregatesFilter<"MasterTrack"> | number
    createdAt?: DateTimeWithAggregatesFilter<"MasterTrack"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MasterTrack"> | Date | string
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: StringFilter<"Transaction"> | string
    trackId?: StringFilter<"Transaction"> | string
    buyerEmail?: StringFilter<"Transaction"> | string
    licenseType?: StringFilter<"Transaction"> | string
    amountPaid?: FloatFilter<"Transaction"> | number
    paymentGateway?: StringFilter<"Transaction"> | string
    licensePdfUrl?: StringFilter<"Transaction"> | string
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    track?: XOR<MasterTrackScalarRelationFilter, MasterTrackWhereInput>
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    trackId?: SortOrder
    buyerEmail?: SortOrder
    licenseType?: SortOrder
    amountPaid?: SortOrder
    paymentGateway?: SortOrder
    licensePdfUrl?: SortOrder
    createdAt?: SortOrder
    track?: MasterTrackOrderByWithRelationInput
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    trackId?: StringFilter<"Transaction"> | string
    buyerEmail?: StringFilter<"Transaction"> | string
    licenseType?: StringFilter<"Transaction"> | string
    amountPaid?: FloatFilter<"Transaction"> | number
    paymentGateway?: StringFilter<"Transaction"> | string
    licensePdfUrl?: StringFilter<"Transaction"> | string
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    track?: XOR<MasterTrackScalarRelationFilter, MasterTrackWhereInput>
  }, "id">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    trackId?: SortOrder
    buyerEmail?: SortOrder
    licenseType?: SortOrder
    amountPaid?: SortOrder
    paymentGateway?: SortOrder
    licensePdfUrl?: SortOrder
    createdAt?: SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transaction"> | string
    trackId?: StringWithAggregatesFilter<"Transaction"> | string
    buyerEmail?: StringWithAggregatesFilter<"Transaction"> | string
    licenseType?: StringWithAggregatesFilter<"Transaction"> | string
    amountPaid?: FloatWithAggregatesFilter<"Transaction"> | number
    paymentGateway?: StringWithAggregatesFilter<"Transaction"> | string
    licensePdfUrl?: StringWithAggregatesFilter<"Transaction"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
  }

  export type MasterTrackCreateInput = {
    id?: string
    title: string
    slug: string
    bpm: number
    musicalKey: string
    genre?: string
    subGenre?: string | null
    moodTags?: MasterTrackCreatemoodTagsInput | string[]
    taggedMp3Url: string
    untaggedWavUrl: string
    stemsZipUrl: string
    coverArtUrl: string
    priceMp3?: number
    priceWav?: number
    priceStems?: number
    priceExclusive?: number
    isExclusiveSold?: boolean
    isVaultLocked?: boolean
    playCount?: number
    downloadCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    sales?: TransactionCreateNestedManyWithoutTrackInput
  }

  export type MasterTrackUncheckedCreateInput = {
    id?: string
    title: string
    slug: string
    bpm: number
    musicalKey: string
    genre?: string
    subGenre?: string | null
    moodTags?: MasterTrackCreatemoodTagsInput | string[]
    taggedMp3Url: string
    untaggedWavUrl: string
    stemsZipUrl: string
    coverArtUrl: string
    priceMp3?: number
    priceWav?: number
    priceStems?: number
    priceExclusive?: number
    isExclusiveSold?: boolean
    isVaultLocked?: boolean
    playCount?: number
    downloadCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    sales?: TransactionUncheckedCreateNestedManyWithoutTrackInput
  }

  export type MasterTrackUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    bpm?: IntFieldUpdateOperationsInput | number
    musicalKey?: StringFieldUpdateOperationsInput | string
    genre?: StringFieldUpdateOperationsInput | string
    subGenre?: NullableStringFieldUpdateOperationsInput | string | null
    moodTags?: MasterTrackUpdatemoodTagsInput | string[]
    taggedMp3Url?: StringFieldUpdateOperationsInput | string
    untaggedWavUrl?: StringFieldUpdateOperationsInput | string
    stemsZipUrl?: StringFieldUpdateOperationsInput | string
    coverArtUrl?: StringFieldUpdateOperationsInput | string
    priceMp3?: FloatFieldUpdateOperationsInput | number
    priceWav?: FloatFieldUpdateOperationsInput | number
    priceStems?: FloatFieldUpdateOperationsInput | number
    priceExclusive?: FloatFieldUpdateOperationsInput | number
    isExclusiveSold?: BoolFieldUpdateOperationsInput | boolean
    isVaultLocked?: BoolFieldUpdateOperationsInput | boolean
    playCount?: IntFieldUpdateOperationsInput | number
    downloadCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sales?: TransactionUpdateManyWithoutTrackNestedInput
  }

  export type MasterTrackUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    bpm?: IntFieldUpdateOperationsInput | number
    musicalKey?: StringFieldUpdateOperationsInput | string
    genre?: StringFieldUpdateOperationsInput | string
    subGenre?: NullableStringFieldUpdateOperationsInput | string | null
    moodTags?: MasterTrackUpdatemoodTagsInput | string[]
    taggedMp3Url?: StringFieldUpdateOperationsInput | string
    untaggedWavUrl?: StringFieldUpdateOperationsInput | string
    stemsZipUrl?: StringFieldUpdateOperationsInput | string
    coverArtUrl?: StringFieldUpdateOperationsInput | string
    priceMp3?: FloatFieldUpdateOperationsInput | number
    priceWav?: FloatFieldUpdateOperationsInput | number
    priceStems?: FloatFieldUpdateOperationsInput | number
    priceExclusive?: FloatFieldUpdateOperationsInput | number
    isExclusiveSold?: BoolFieldUpdateOperationsInput | boolean
    isVaultLocked?: BoolFieldUpdateOperationsInput | boolean
    playCount?: IntFieldUpdateOperationsInput | number
    downloadCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sales?: TransactionUncheckedUpdateManyWithoutTrackNestedInput
  }

  export type MasterTrackCreateManyInput = {
    id?: string
    title: string
    slug: string
    bpm: number
    musicalKey: string
    genre?: string
    subGenre?: string | null
    moodTags?: MasterTrackCreatemoodTagsInput | string[]
    taggedMp3Url: string
    untaggedWavUrl: string
    stemsZipUrl: string
    coverArtUrl: string
    priceMp3?: number
    priceWav?: number
    priceStems?: number
    priceExclusive?: number
    isExclusiveSold?: boolean
    isVaultLocked?: boolean
    playCount?: number
    downloadCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MasterTrackUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    bpm?: IntFieldUpdateOperationsInput | number
    musicalKey?: StringFieldUpdateOperationsInput | string
    genre?: StringFieldUpdateOperationsInput | string
    subGenre?: NullableStringFieldUpdateOperationsInput | string | null
    moodTags?: MasterTrackUpdatemoodTagsInput | string[]
    taggedMp3Url?: StringFieldUpdateOperationsInput | string
    untaggedWavUrl?: StringFieldUpdateOperationsInput | string
    stemsZipUrl?: StringFieldUpdateOperationsInput | string
    coverArtUrl?: StringFieldUpdateOperationsInput | string
    priceMp3?: FloatFieldUpdateOperationsInput | number
    priceWav?: FloatFieldUpdateOperationsInput | number
    priceStems?: FloatFieldUpdateOperationsInput | number
    priceExclusive?: FloatFieldUpdateOperationsInput | number
    isExclusiveSold?: BoolFieldUpdateOperationsInput | boolean
    isVaultLocked?: BoolFieldUpdateOperationsInput | boolean
    playCount?: IntFieldUpdateOperationsInput | number
    downloadCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MasterTrackUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    bpm?: IntFieldUpdateOperationsInput | number
    musicalKey?: StringFieldUpdateOperationsInput | string
    genre?: StringFieldUpdateOperationsInput | string
    subGenre?: NullableStringFieldUpdateOperationsInput | string | null
    moodTags?: MasterTrackUpdatemoodTagsInput | string[]
    taggedMp3Url?: StringFieldUpdateOperationsInput | string
    untaggedWavUrl?: StringFieldUpdateOperationsInput | string
    stemsZipUrl?: StringFieldUpdateOperationsInput | string
    coverArtUrl?: StringFieldUpdateOperationsInput | string
    priceMp3?: FloatFieldUpdateOperationsInput | number
    priceWav?: FloatFieldUpdateOperationsInput | number
    priceStems?: FloatFieldUpdateOperationsInput | number
    priceExclusive?: FloatFieldUpdateOperationsInput | number
    isExclusiveSold?: BoolFieldUpdateOperationsInput | boolean
    isVaultLocked?: BoolFieldUpdateOperationsInput | boolean
    playCount?: IntFieldUpdateOperationsInput | number
    downloadCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateInput = {
    id?: string
    buyerEmail: string
    licenseType: string
    amountPaid: number
    paymentGateway: string
    licensePdfUrl: string
    createdAt?: Date | string
    track: MasterTrackCreateNestedOneWithoutSalesInput
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    trackId: string
    buyerEmail: string
    licenseType: string
    amountPaid: number
    paymentGateway: string
    licensePdfUrl: string
    createdAt?: Date | string
  }

  export type TransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    buyerEmail?: StringFieldUpdateOperationsInput | string
    licenseType?: StringFieldUpdateOperationsInput | string
    amountPaid?: FloatFieldUpdateOperationsInput | number
    paymentGateway?: StringFieldUpdateOperationsInput | string
    licensePdfUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    track?: MasterTrackUpdateOneRequiredWithoutSalesNestedInput
  }

  export type TransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    trackId?: StringFieldUpdateOperationsInput | string
    buyerEmail?: StringFieldUpdateOperationsInput | string
    licenseType?: StringFieldUpdateOperationsInput | string
    amountPaid?: FloatFieldUpdateOperationsInput | number
    paymentGateway?: StringFieldUpdateOperationsInput | string
    licensePdfUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyInput = {
    id?: string
    trackId: string
    buyerEmail: string
    licenseType: string
    amountPaid: number
    paymentGateway: string
    licensePdfUrl: string
    createdAt?: Date | string
  }

  export type TransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    buyerEmail?: StringFieldUpdateOperationsInput | string
    licenseType?: StringFieldUpdateOperationsInput | string
    amountPaid?: FloatFieldUpdateOperationsInput | number
    paymentGateway?: StringFieldUpdateOperationsInput | string
    licensePdfUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    trackId?: StringFieldUpdateOperationsInput | string
    buyerEmail?: StringFieldUpdateOperationsInput | string
    licenseType?: StringFieldUpdateOperationsInput | string
    amountPaid?: FloatFieldUpdateOperationsInput | number
    paymentGateway?: StringFieldUpdateOperationsInput | string
    licensePdfUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput
    some?: TransactionWhereInput
    none?: TransactionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MasterTrackCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    bpm?: SortOrder
    musicalKey?: SortOrder
    genre?: SortOrder
    subGenre?: SortOrder
    moodTags?: SortOrder
    taggedMp3Url?: SortOrder
    untaggedWavUrl?: SortOrder
    stemsZipUrl?: SortOrder
    coverArtUrl?: SortOrder
    priceMp3?: SortOrder
    priceWav?: SortOrder
    priceStems?: SortOrder
    priceExclusive?: SortOrder
    isExclusiveSold?: SortOrder
    isVaultLocked?: SortOrder
    playCount?: SortOrder
    downloadCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MasterTrackAvgOrderByAggregateInput = {
    bpm?: SortOrder
    priceMp3?: SortOrder
    priceWav?: SortOrder
    priceStems?: SortOrder
    priceExclusive?: SortOrder
    playCount?: SortOrder
    downloadCount?: SortOrder
  }

  export type MasterTrackMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    bpm?: SortOrder
    musicalKey?: SortOrder
    genre?: SortOrder
    subGenre?: SortOrder
    taggedMp3Url?: SortOrder
    untaggedWavUrl?: SortOrder
    stemsZipUrl?: SortOrder
    coverArtUrl?: SortOrder
    priceMp3?: SortOrder
    priceWav?: SortOrder
    priceStems?: SortOrder
    priceExclusive?: SortOrder
    isExclusiveSold?: SortOrder
    isVaultLocked?: SortOrder
    playCount?: SortOrder
    downloadCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MasterTrackMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    bpm?: SortOrder
    musicalKey?: SortOrder
    genre?: SortOrder
    subGenre?: SortOrder
    taggedMp3Url?: SortOrder
    untaggedWavUrl?: SortOrder
    stemsZipUrl?: SortOrder
    coverArtUrl?: SortOrder
    priceMp3?: SortOrder
    priceWav?: SortOrder
    priceStems?: SortOrder
    priceExclusive?: SortOrder
    isExclusiveSold?: SortOrder
    isVaultLocked?: SortOrder
    playCount?: SortOrder
    downloadCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MasterTrackSumOrderByAggregateInput = {
    bpm?: SortOrder
    priceMp3?: SortOrder
    priceWav?: SortOrder
    priceStems?: SortOrder
    priceExclusive?: SortOrder
    playCount?: SortOrder
    downloadCount?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type MasterTrackScalarRelationFilter = {
    is?: MasterTrackWhereInput
    isNot?: MasterTrackWhereInput
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    trackId?: SortOrder
    buyerEmail?: SortOrder
    licenseType?: SortOrder
    amountPaid?: SortOrder
    paymentGateway?: SortOrder
    licensePdfUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    amountPaid?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    trackId?: SortOrder
    buyerEmail?: SortOrder
    licenseType?: SortOrder
    amountPaid?: SortOrder
    paymentGateway?: SortOrder
    licensePdfUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    trackId?: SortOrder
    buyerEmail?: SortOrder
    licenseType?: SortOrder
    amountPaid?: SortOrder
    paymentGateway?: SortOrder
    licensePdfUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    amountPaid?: SortOrder
  }

  export type MasterTrackCreatemoodTagsInput = {
    set: string[]
  }

  export type TransactionCreateNestedManyWithoutTrackInput = {
    create?: XOR<TransactionCreateWithoutTrackInput, TransactionUncheckedCreateWithoutTrackInput> | TransactionCreateWithoutTrackInput[] | TransactionUncheckedCreateWithoutTrackInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutTrackInput | TransactionCreateOrConnectWithoutTrackInput[]
    createMany?: TransactionCreateManyTrackInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutTrackInput = {
    create?: XOR<TransactionCreateWithoutTrackInput, TransactionUncheckedCreateWithoutTrackInput> | TransactionCreateWithoutTrackInput[] | TransactionUncheckedCreateWithoutTrackInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutTrackInput | TransactionCreateOrConnectWithoutTrackInput[]
    createMany?: TransactionCreateManyTrackInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type MasterTrackUpdatemoodTagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TransactionUpdateManyWithoutTrackNestedInput = {
    create?: XOR<TransactionCreateWithoutTrackInput, TransactionUncheckedCreateWithoutTrackInput> | TransactionCreateWithoutTrackInput[] | TransactionUncheckedCreateWithoutTrackInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutTrackInput | TransactionCreateOrConnectWithoutTrackInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutTrackInput | TransactionUpsertWithWhereUniqueWithoutTrackInput[]
    createMany?: TransactionCreateManyTrackInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutTrackInput | TransactionUpdateWithWhereUniqueWithoutTrackInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutTrackInput | TransactionUpdateManyWithWhereWithoutTrackInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutTrackNestedInput = {
    create?: XOR<TransactionCreateWithoutTrackInput, TransactionUncheckedCreateWithoutTrackInput> | TransactionCreateWithoutTrackInput[] | TransactionUncheckedCreateWithoutTrackInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutTrackInput | TransactionCreateOrConnectWithoutTrackInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutTrackInput | TransactionUpsertWithWhereUniqueWithoutTrackInput[]
    createMany?: TransactionCreateManyTrackInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutTrackInput | TransactionUpdateWithWhereUniqueWithoutTrackInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutTrackInput | TransactionUpdateManyWithWhereWithoutTrackInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type MasterTrackCreateNestedOneWithoutSalesInput = {
    create?: XOR<MasterTrackCreateWithoutSalesInput, MasterTrackUncheckedCreateWithoutSalesInput>
    connectOrCreate?: MasterTrackCreateOrConnectWithoutSalesInput
    connect?: MasterTrackWhereUniqueInput
  }

  export type MasterTrackUpdateOneRequiredWithoutSalesNestedInput = {
    create?: XOR<MasterTrackCreateWithoutSalesInput, MasterTrackUncheckedCreateWithoutSalesInput>
    connectOrCreate?: MasterTrackCreateOrConnectWithoutSalesInput
    upsert?: MasterTrackUpsertWithoutSalesInput
    connect?: MasterTrackWhereUniqueInput
    update?: XOR<XOR<MasterTrackUpdateToOneWithWhereWithoutSalesInput, MasterTrackUpdateWithoutSalesInput>, MasterTrackUncheckedUpdateWithoutSalesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type TransactionCreateWithoutTrackInput = {
    id?: string
    buyerEmail: string
    licenseType: string
    amountPaid: number
    paymentGateway: string
    licensePdfUrl: string
    createdAt?: Date | string
  }

  export type TransactionUncheckedCreateWithoutTrackInput = {
    id?: string
    buyerEmail: string
    licenseType: string
    amountPaid: number
    paymentGateway: string
    licensePdfUrl: string
    createdAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutTrackInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutTrackInput, TransactionUncheckedCreateWithoutTrackInput>
  }

  export type TransactionCreateManyTrackInputEnvelope = {
    data: TransactionCreateManyTrackInput | TransactionCreateManyTrackInput[]
    skipDuplicates?: boolean
  }

  export type TransactionUpsertWithWhereUniqueWithoutTrackInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutTrackInput, TransactionUncheckedUpdateWithoutTrackInput>
    create: XOR<TransactionCreateWithoutTrackInput, TransactionUncheckedCreateWithoutTrackInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutTrackInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutTrackInput, TransactionUncheckedUpdateWithoutTrackInput>
  }

  export type TransactionUpdateManyWithWhereWithoutTrackInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutTrackInput>
  }

  export type TransactionScalarWhereInput = {
    AND?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    OR?: TransactionScalarWhereInput[]
    NOT?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    id?: StringFilter<"Transaction"> | string
    trackId?: StringFilter<"Transaction"> | string
    buyerEmail?: StringFilter<"Transaction"> | string
    licenseType?: StringFilter<"Transaction"> | string
    amountPaid?: FloatFilter<"Transaction"> | number
    paymentGateway?: StringFilter<"Transaction"> | string
    licensePdfUrl?: StringFilter<"Transaction"> | string
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
  }

  export type MasterTrackCreateWithoutSalesInput = {
    id?: string
    title: string
    slug: string
    bpm: number
    musicalKey: string
    genre?: string
    subGenre?: string | null
    moodTags?: MasterTrackCreatemoodTagsInput | string[]
    taggedMp3Url: string
    untaggedWavUrl: string
    stemsZipUrl: string
    coverArtUrl: string
    priceMp3?: number
    priceWav?: number
    priceStems?: number
    priceExclusive?: number
    isExclusiveSold?: boolean
    isVaultLocked?: boolean
    playCount?: number
    downloadCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MasterTrackUncheckedCreateWithoutSalesInput = {
    id?: string
    title: string
    slug: string
    bpm: number
    musicalKey: string
    genre?: string
    subGenre?: string | null
    moodTags?: MasterTrackCreatemoodTagsInput | string[]
    taggedMp3Url: string
    untaggedWavUrl: string
    stemsZipUrl: string
    coverArtUrl: string
    priceMp3?: number
    priceWav?: number
    priceStems?: number
    priceExclusive?: number
    isExclusiveSold?: boolean
    isVaultLocked?: boolean
    playCount?: number
    downloadCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MasterTrackCreateOrConnectWithoutSalesInput = {
    where: MasterTrackWhereUniqueInput
    create: XOR<MasterTrackCreateWithoutSalesInput, MasterTrackUncheckedCreateWithoutSalesInput>
  }

  export type MasterTrackUpsertWithoutSalesInput = {
    update: XOR<MasterTrackUpdateWithoutSalesInput, MasterTrackUncheckedUpdateWithoutSalesInput>
    create: XOR<MasterTrackCreateWithoutSalesInput, MasterTrackUncheckedCreateWithoutSalesInput>
    where?: MasterTrackWhereInput
  }

  export type MasterTrackUpdateToOneWithWhereWithoutSalesInput = {
    where?: MasterTrackWhereInput
    data: XOR<MasterTrackUpdateWithoutSalesInput, MasterTrackUncheckedUpdateWithoutSalesInput>
  }

  export type MasterTrackUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    bpm?: IntFieldUpdateOperationsInput | number
    musicalKey?: StringFieldUpdateOperationsInput | string
    genre?: StringFieldUpdateOperationsInput | string
    subGenre?: NullableStringFieldUpdateOperationsInput | string | null
    moodTags?: MasterTrackUpdatemoodTagsInput | string[]
    taggedMp3Url?: StringFieldUpdateOperationsInput | string
    untaggedWavUrl?: StringFieldUpdateOperationsInput | string
    stemsZipUrl?: StringFieldUpdateOperationsInput | string
    coverArtUrl?: StringFieldUpdateOperationsInput | string
    priceMp3?: FloatFieldUpdateOperationsInput | number
    priceWav?: FloatFieldUpdateOperationsInput | number
    priceStems?: FloatFieldUpdateOperationsInput | number
    priceExclusive?: FloatFieldUpdateOperationsInput | number
    isExclusiveSold?: BoolFieldUpdateOperationsInput | boolean
    isVaultLocked?: BoolFieldUpdateOperationsInput | boolean
    playCount?: IntFieldUpdateOperationsInput | number
    downloadCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MasterTrackUncheckedUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    bpm?: IntFieldUpdateOperationsInput | number
    musicalKey?: StringFieldUpdateOperationsInput | string
    genre?: StringFieldUpdateOperationsInput | string
    subGenre?: NullableStringFieldUpdateOperationsInput | string | null
    moodTags?: MasterTrackUpdatemoodTagsInput | string[]
    taggedMp3Url?: StringFieldUpdateOperationsInput | string
    untaggedWavUrl?: StringFieldUpdateOperationsInput | string
    stemsZipUrl?: StringFieldUpdateOperationsInput | string
    coverArtUrl?: StringFieldUpdateOperationsInput | string
    priceMp3?: FloatFieldUpdateOperationsInput | number
    priceWav?: FloatFieldUpdateOperationsInput | number
    priceStems?: FloatFieldUpdateOperationsInput | number
    priceExclusive?: FloatFieldUpdateOperationsInput | number
    isExclusiveSold?: BoolFieldUpdateOperationsInput | boolean
    isVaultLocked?: BoolFieldUpdateOperationsInput | boolean
    playCount?: IntFieldUpdateOperationsInput | number
    downloadCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyTrackInput = {
    id?: string
    buyerEmail: string
    licenseType: string
    amountPaid: number
    paymentGateway: string
    licensePdfUrl: string
    createdAt?: Date | string
  }

  export type TransactionUpdateWithoutTrackInput = {
    id?: StringFieldUpdateOperationsInput | string
    buyerEmail?: StringFieldUpdateOperationsInput | string
    licenseType?: StringFieldUpdateOperationsInput | string
    amountPaid?: FloatFieldUpdateOperationsInput | number
    paymentGateway?: StringFieldUpdateOperationsInput | string
    licensePdfUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateWithoutTrackInput = {
    id?: StringFieldUpdateOperationsInput | string
    buyerEmail?: StringFieldUpdateOperationsInput | string
    licenseType?: StringFieldUpdateOperationsInput | string
    amountPaid?: FloatFieldUpdateOperationsInput | number
    paymentGateway?: StringFieldUpdateOperationsInput | string
    licensePdfUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutTrackInput = {
    id?: StringFieldUpdateOperationsInput | string
    buyerEmail?: StringFieldUpdateOperationsInput | string
    licenseType?: StringFieldUpdateOperationsInput | string
    amountPaid?: FloatFieldUpdateOperationsInput | number
    paymentGateway?: StringFieldUpdateOperationsInput | string
    licensePdfUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}