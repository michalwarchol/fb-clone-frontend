import { cacheExchange, Resolver } from "@urql/exchange-graphcache";
import { dedupExchange, Exchange, stringifyVariables, gql } from "urql";
import {
  LogoutMutation,
  LoggedUserQuery,
  LoggedUserDocument,
  LoginMutation,
  RegisterMutation,
  AcceptFriendRequestMutation,
  GetInProgressFriendRequestsQuery,
  GetInProgressFriendRequestsDocument,
  ReactionInput,
  GetPostCommentsDocument,
  GetPostCommentsQuery,
  Comment,
  CommentCountDocument,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { pipe, tap } from "wonka";
import Router from "next/router";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";
import { isServer } from "./isServer";
import { SSRExchange } from "next-urql";
import { NextPageContext } from "next";

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

      if (
        fieldArgs.creatorId &&
        fi.arguments.creatorId &&
        fieldArgs.creatorId == fi.arguments.creatorId
      ) {
        if (!_hasMore) {
          hasMore = _hasMore as boolean;
        }
        results.push(...data);
      } else if (!fieldArgs.creatorId && !fi.arguments.creatorId) {
        if (!_hasMore) {
          hasMore = _hasMore as boolean;
        }
        results.push(...data);
      }
    });
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

export const createUrqlClient = (ssrExchange: SSRExchange, ctx?: NextPageContext) => {
  let cookie = "";
  if (isServer) {
    cookie = ctx?.req?.headers?.cookie;
  }
  return {
    url: process.env.NEXT_PUBLIC_API_URL,
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie
        ? {
          cookie,
        }
        : undefined,
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
            getPostComments: commentPagination(),
            getUserFriendRequests: friendRequestPagination(),
          },
        },
        updates: {
          Mutation: {
            createPost: (_result, args, cache) => {
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
            createComment: (result, args, cache) => {
              const loggedUser = cache.readQuery<LoggedUserQuery>({
                query: LoggedUserDocument,
              });
              cache.updateQuery<GetPostCommentsQuery>(
                {
                  query: GetPostCommentsDocument,
                  variables: { limit: 5, postId: args.postId },
                },
                (data) => {
                  data.getPostComments.comments.unshift({
                    ...result.createComment as Comment,
                    createdAt: new Date().toDateString(),
                    updatedAt: new Date().toDateString(),
                    creator: loggedUser.loggedUser.user,
                  });
                  return data;
                }
              );
              cache.updateQuery(
                {
                  query: CommentCountDocument,
                  variables: { postId: args.postId },
                },
                (data) => {
                  const newData = data;
                  (newData.commentCount as number) += 1;
                  return newData;
                }
              );
            },
            logout: (_result, args, cache) => {
              cache.invalidate("Query");
              betterUpdateQuery<LogoutMutation, LoggedUserQuery>(
                cache,
                { query: LoggedUserDocument },
                _result,
                () => ({ loggedUser: null })
              );
            },
            login: (_result, args, cache) => {
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
              cache.invalidate("Query");
            },

            register: (_result, args, cache) => {
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
            react: (_result, args, cache) => {
              const { postId, reaction } = args.variables as ReactionInput;
              const allFields = cache.inspectFields("Query");

              const reactions = allFields.filter(
                (info) => info.fieldName === "reaction"
              );

              const postReaction = reactions.filter(
                (r) => r.arguments.postId == postId
              );

              const myReaction = postReaction[0];
              const resolvedReaction = cache.resolve(
                "Query",
                myReaction.fieldKey
              ) as string;

              cache.invalidate("Query", "reaction", myReaction.arguments);
              if (!resolvedReaction) {
                //if previous reaction doesn't exist, then only increase next reaction
                const thisPost = cache.readFragment(
                  gql`
              fragment ____ on Post {
                _id
                ${reaction.toLowerCase()}
              }
            `,
                  { _id: postId as number } as object
                );
                cache.writeFragment(
                  gql`
                fragment _ on Post {
                  _id
                  ${reaction.toLowerCase()}
                }
              `,
                  {
                    _id: postId,
                    [reaction.toLowerCase()]:
                      thisPost[reaction.toLowerCase()] + 1,
                  }
                );
                return;
              }

              const previousReaction = cache.resolve(
                resolvedReaction,
                "reaction"
              );
              const thisPost = cache.readFragment(
                gql`
              fragment ___ on Post {
                _id
                ${previousReaction as string}
                ${reaction.toLowerCase()}
              }
            `,
                { _id: postId }
              );
              if ((previousReaction as string) == reaction.toLowerCase()) {
                //if previous reaction is the same as next reaction then only decrease the reaction
                cache.writeFragment(
                  gql`
              fragment ___ on Post {
                _id
                ${previousReaction as string}
              }
            `,
                  {
                    _id: postId,
                    [previousReaction as string]:
                      thisPost[previousReaction as string] - 1,
                  }
                );

                return;
              }
              //if previous reaction is different from next reaction, then decrease previous and increase next
              cache.writeFragment(
                gql`
              fragment ___ on Post {
                _id
                ${previousReaction as string}
                ${reaction.toLowerCase()}
              }
            `,
                {
                  _id: postId,
                  [previousReaction as string]:
                    thisPost[previousReaction as string] - 1,
                  [reaction.toLowerCase()]:
                    thisPost[reaction.toLowerCase()] + 1,
                }
              );
            },

            uploadImage: (_result, args, cache) => {
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
            createFriendRequest: (_result, args, cache) => {
              const allFields = cache.inspectFields("Query");
              const getFriendRequest = allFields.filter(
                (info) => info.fieldName === "getFriendRequest"
              );

              getFriendRequest.forEach((fi) => {
                cache.invalidate(
                  "Query",
                  "getFriendRequest",
                  fi.arguments || {}
                );
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
            acceptFriendRequest: (_result, args, cache) => {
              const allFields = cache.inspectFields("Query");
              const getFriendRequest = allFields.filter(
                (info) => info.fieldName === "getFriendRequest"
              );

              getFriendRequest.forEach((fi) => {
                cache.invalidate(
                  "Query",
                  "getFriendRequest",
                  fi.arguments || {}
                );
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
            removeFriendRequest: (_result, args, cache) => {
              const allFields = cache.inspectFields("Query");
              const getFriendRequest = allFields.filter(
                (info) => info.fieldName === "getFriendRequest"
              );

              getFriendRequest.forEach((fi) => {
                cache.invalidate(
                  "Query",
                  "getFriendRequest",
                  fi.arguments || {}
                );
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
            updateNotificationStatus: (_result, args, cache) => {
              cache.invalidate("Query", "getNewNotificationsCount");
            },
          },
        },
      }),
      errorExchange,
      ssrExchange,
      multipartFetchExchange,
    ],
  };
};
