import { cacheExchange, Resolver } from "@urql/exchange-graphcache";
import { dedupExchange, Exchange, stringifyVariables } from "urql";
import {
  LogoutMutation,
  LoggedUserQuery,
  LoggedUserDocument,
  LoginMutation,
  RegisterMutation,
  AcceptFriendRequestMutation,
  GetInProgressFriendRequestsQuery,
  GetInProgressFriendRequestsDocument,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { pipe, tap } from "wonka";
import Router from "next/router";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";

const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error) {
          if (error?.message.includes("not authenticated")) {
            Router.replace("login");
          }
        }
      })
    );
  };

const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(
      cache.resolve(entityKey, fieldKey) as string,
      "posts"
    );
    info.partial = !isItInTheCache;
    let hasMore = true;
    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "posts") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });
    return {
      __typename: "PaginatedPosts",
      hasMore,
      posts: results,
    };
  };
};

const cursorCreatorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const fields = fieldInfos.filter(
      (field) => field.arguments.creatorId === info.variables.creatorId
    );
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    let hasMore = true;
    const results: string[] = [];
    fields.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "posts") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(
      cache.resolve(entityKey, fieldKey) as string,
      "posts"
    );
    info.partial = !isItInTheCache;

    return {
      __typename: "PaginatedPosts",
      hasMore,
      posts: results,
    };
  };
};

const commentPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter(
      (info) =>
        info.fieldName === fieldName &&
        info.arguments.postId === fieldArgs.postId
    );
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }
    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(entityKey, fieldKey) as string;
    info.partial = !isItInTheCache;

    let hasMore = true;
    const results: string[] = [];

    fieldInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "comments") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });

    return {
      __typename: "PaginatedComments",
      hasMore,
      comments: results,
    };
  };
};

const friendRequestPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const fields = fieldInfos.filter(
      (field) => field.arguments.userId === info.variables.userId
    );
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(
      cache.resolve(entityKey, fieldKey) as string,
      "getUserFriendRequests"
    );
    info.partial = !isItInTheCache;
    let hasMore = true;
    const results: string[] = [];

    if (fieldArgs["skip"] == undefined) {
      fields.forEach((fi) => {
        const key = cache.resolve(entityKey, fi.fieldKey) as string;
        const data = cache.resolve(
          key,
          "friendRequestsWithFriends"
        ) as string[];
        const _hasMore = cache.resolve(key, "hasMore");
        if (fi.arguments.skip == undefined) {
          if (!_hasMore) {
            hasMore = _hasMore as boolean;
          }
          results.push(...data);
        }
      });
      return {
        __typename: "PaginatedRequests",
        hasMore,
        friendRequestsWithFriends: results,
      };
    }

    fields.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "friendRequestsWithFriends") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (fi.arguments.skip != undefined) {
        if (!_hasMore) {
          hasMore = _hasMore as boolean;
        }
        results.push(...data);
      }
    });
    return {
      __typename: "PaginatedRequests",
      hasMore,
      friendRequestsWithFriends: results,
    };
  };
};

export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      keys: {
        PaginatedPosts: () => null,
        PaginatedComments: () => null,
        FullUser: () => null,
        PaginatedRequests: () => null,
        FriendRequest: () => null,
        UserRequest: () => null,
        FriendRequestWithFriend: () => null,
        FriendSuggestion: () => null,
      },
      resolvers: {
        Query: {
          posts: cursorPagination(),
          getPostsByCreatorId: cursorCreatorPagination(),
          getPostComments: commentPagination(),
          getUserFriendRequests: friendRequestPagination(),
        },
      },
      updates: {
        Mutation: {
          createPost: (_result, args, cache, info) => {
            const allFields = cache.inspectFields("Query");
            const fieldInfos = allFields.filter(
              (info) => info.fieldName === "posts"
            );
            fieldInfos.forEach((fi) => {
              cache.invalidate("Query", "posts", fi.arguments || {});
            });

            const creatorPosts = allFields.filter(
              (info) => info.fieldName === "getPostsByCreatorId"
            );
            creatorPosts.forEach((fi) => {
              cache.invalidate(
                "Query",
                "getPostsByCreatorId",
                fi.arguments || {}
              );
            });
          },
          createComment: (result, args, cache, info) => {
            const allFields = cache.inspectFields("Query");
            const fieldInfos = allFields.filter(
              (info) =>
                info.fieldName === "getPostComments" &&
                info.arguments.postId === args.postId
            );
            fieldInfos.forEach((fi) => {
                cache.invalidate("Query", "getPostComments", fi.arguments || {});
            });

            const commentCount = allFields.filter(
              (info) =>
                info.fieldName === "commentCount" &&
                info.arguments.postId === args.postId
            );

            commentCount.forEach((fi) => {
              cache.invalidate("Query", "commentCount", fi.arguments || {});
          });
          },
          logout: (_result, args, cache, info) => {
            cache.invalidate("Query");
            betterUpdateQuery<LogoutMutation, LoggedUserQuery>(
              cache,
              { query: LoggedUserDocument },
              _result,
              () => ({ loggedUser: null })
            );
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
                    loggedUser: {
                      ...result.login.loggedUser,
                    },
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
                    loggedUser: {
                      ...result.register.loggedUser,
                    },
                  };
                }
              }
            );
          },
          react: (_result, args, cache, info) => {
            const allFields = cache.inspectFields("Query");
            const fieldInfos = allFields.filter(
              (info) => info.fieldName === "reaction"
            );

            fieldInfos.forEach((fi) => {
              cache.invalidate("Query", "reaction", fi.arguments || {});
            });

            const posts = allFields.filter(
              (info) => info.fieldName === "posts"
            );

            posts.forEach((fi) => {
              cache.invalidate("Query", "posts", fi.arguments || {});
            });
            return true;
          },
          uploadImage: (_result, args, cache, info) => {
            const allFields = cache.inspectFields("Query");
            const getUserById = allFields.filter(
              (info) => info.fieldName === "getUserById"
            );

            getUserById.forEach((fi) => {
              cache.invalidate("Query", "getUserById", fi.arguments || {});
            });

            const getImage = allFields.filter(
              (info) => info.fieldName === "getImage"
            );
            getImage.forEach((fi) => {
              cache.invalidate("Query", "getImage", fi.arguments || {});
            });
          },
          createFriendRequest: (_result, args, cache, info) => {
            const allFields = cache.inspectFields("Query");
            const getFriendRequest = allFields.filter(
              (info) => info.fieldName === "getFriendRequest"
            );

            getFriendRequest.forEach((fi) => {
              cache.invalidate("Query", "getFriendRequest", fi.arguments || {});
            });

            const getSuggestedFriends = allFields.filter(
              (info) => info.fieldName === "getSuggestedFriends"
            );

            getSuggestedFriends.forEach((fi) => {
              cache.invalidate(
                "Query",
                "getSuggestedFriends",
                fi.arguments || {}
              );
            });
          },
          acceptFriendRequest: (_result, args, cache, info) => {
            const allFields = cache.inspectFields("Query");
            const getFriendRequest = allFields.filter(
              (info) => info.fieldName === "getFriendRequest"
            );

            getFriendRequest.forEach((fi) => {
              cache.invalidate("Query", "getFriendRequest", fi.arguments || {});
            });

            betterUpdateQuery<
              AcceptFriendRequestMutation,
              GetInProgressFriendRequestsQuery
            >(
              cache,
              { query: GetInProgressFriendRequestsDocument },
              _result,
              (result, query) => {
                query.getInProgressFriendRequests =
                  query.getInProgressFriendRequests.filter(
                    (request) => request.friend._id != args.userId
                  );
                return query;
              }
            );
          },
          removeFriendRequest: (_result, args, cache, info) => {
            const allFields = cache.inspectFields("Query");
            const getFriendRequest = allFields.filter(
              (info) => info.fieldName === "getFriendRequest"
            );

            getFriendRequest.forEach((fi) => {
              cache.invalidate("Query", "getFriendRequest", fi.arguments || {});
            });

            betterUpdateQuery<
              AcceptFriendRequestMutation,
              GetInProgressFriendRequestsQuery
            >(
              cache,
              { query: GetInProgressFriendRequestsDocument },
              _result,
              (result, query) => {
                query.getInProgressFriendRequests =
                  query.getInProgressFriendRequests.filter(
                    (request) => request.friend._id != args.userId
                  );
                return query;
              }
            );
          },
          updateNotificationStatus: (_result, args, cache, info) => {
            cache.invalidate("Query", "getNewNotificationsCount");
          }
        },
      },
    }),
    errorExchange,
    ssrExchange,
    multipartFetchExchange,
  ],
});
