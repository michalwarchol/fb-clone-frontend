import { cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "urql";
import { LogoutMutation, LoggedUserQuery, LoggedUserDocument, LoginMutation, RegisterMutation } from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";

export const createUrqlClient = (ssrExchange: any) => ({
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include" as const,
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        updates: {
          Mutation: {
            logout: (_result, args, cache, info)=>{
              betterUpdateQuery<LogoutMutation, LoggedUserQuery>(
                cache, {query: LoggedUserDocument},
                _result,
                ()=>({loggedUser: null})
              )
            },
            login: (_result, args, cache, info) => {
              betterUpdateQuery<LoginMutation, LoggedUserQuery>(
                cache,
                { query: LoggedUserDocument },
                _result,
                (result, query) => {
                  if (result.login.errors) {
                    return query;
                  } else {
                    return {
                      loggedUser: result.login.user,
                    };
                  }
                }
              );
            },

            register: (_result, args, cache, info) => {
              betterUpdateQuery<RegisterMutation, LoggedUserQuery>(
                cache,
                { query: LoggedUserDocument },
                _result,
                (result, query) => {
                  if (result.register.errors) {
                    return query;
                  } else {
                    return {
                      loggedUser: result.register.user,
                    };
                  }
                }
              );
            },
          },
        },
      }),
      ssrExchange,
      fetchExchange,
    ],
  })