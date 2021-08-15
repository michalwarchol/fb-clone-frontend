import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Credentials = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  react: Scalars['Boolean'];
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationUpdatePostArgs = {
  text?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationRegisterArgs = {
  credentials: Credentials;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationReactArgs = {
  variables: ReactionInput;
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  posts: Array<Post>;
  hasMore: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['Int'];
  creatorId: Scalars['Float'];
  creator: User;
  text: Scalars['String'];
  feeling: Scalars['String'];
  activity: Scalars['String'];
  like: Scalars['Float'];
  love: Scalars['Float'];
  care: Scalars['Float'];
  haha: Scalars['Float'];
  wow: Scalars['Float'];
  sad: Scalars['Float'];
  angry: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PostInput = {
  text: Scalars['String'];
  feeling: Scalars['String'];
  activity: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  posts: PaginatedPosts;
  post?: Maybe<Post>;
  loggedUser?: Maybe<User>;
  reactions: Array<Reaction>;
  reaction?: Maybe<Reaction>;
};


export type QueryPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryReactionArgs = {
  postId: Scalars['Int'];
};

export type Reaction = {
  __typename?: 'Reaction';
  _id: Scalars['Int'];
  reaction: Scalars['String'];
  value: Scalars['Int'];
  userId: Scalars['Int'];
  postId: Scalars['Int'];
};

export type ReactionInput = {
  reaction: ReactionType;
  postId: Scalars['Int'];
  value: Scalars['Int'];
};

/** Reactions, that a user can have on a post */
export enum ReactionType {
  Like = 'LIKE',
  Love = 'LOVE',
  Care = 'CARE',
  Haha = 'HAHA',
  Wow = 'WOW',
  Sad = 'SAD',
  Angry = 'ANGRY'
}

export type User = {
  __typename?: 'User';
  _id: Scalars['Int'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularReactionsFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'like' | 'love' | 'care' | 'haha' | 'wow' | 'sad' | 'angry'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, '_id' | 'username'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & Pick<Post, '_id' | 'creatorId' | 'text' | 'feeling' | 'activity' | 'like' | 'love' | 'care' | 'haha' | 'wow' | 'sad' | 'angry' | 'createdAt' | 'updatedAt'>
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type ReactMutationVariables = Exact<{
  variables: ReactionInput;
}>;


export type ReactMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'react'>
);

export type RegisterMutationVariables = Exact<{
  credentials: Credentials;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LoggedUserQueryVariables = Exact<{ [key: string]: never; }>;


export type LoggedUserQuery = (
  { __typename?: 'Query' }
  & { loggedUser?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: (
    { __typename?: 'PaginatedPosts' }
    & Pick<PaginatedPosts, 'hasMore'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & Pick<Post, '_id' | 'text' | 'feeling' | 'activity' | 'like' | 'love' | 'care' | 'haha' | 'wow' | 'sad' | 'angry' | 'creatorId' | 'createdAt' | 'updatedAt'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, '_id' | 'username' | 'email' | 'createdAt' | 'updatedAt'>
      ) }
    )> }
  ) }
);

export type ReactionQueryVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type ReactionQuery = (
  { __typename?: 'Query' }
  & { reaction?: Maybe<(
    { __typename?: 'Reaction' }
    & Pick<Reaction, '_id' | 'reaction' | 'userId' | 'value' | 'postId'>
  )> }
);

export const RegularReactionsFragmentDoc = gql`
    fragment RegularReactions on Post {
  like
  love
  care
  haha
  wow
  sad
  angry
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  _id
  username
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreatePostDocument = gql`
    mutation CreatePost($input: PostInput!) {
  createPost(input: $input) {
    _id
    creatorId
    text
    feeling
    activity
    like
    love
    care
    haha
    wow
    sad
    angry
    createdAt
    updatedAt
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const ReactDocument = gql`
    mutation React($variables: ReactionInput!) {
  react(variables: $variables)
}
    `;

export function useReactMutation() {
  return Urql.useMutation<ReactMutation, ReactMutationVariables>(ReactDocument);
};
export const RegisterDocument = gql`
    mutation Register($credentials: Credentials!) {
  register(credentials: $credentials) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const LoggedUserDocument = gql`
    query loggedUser {
  loggedUser {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useLoggedUserQuery(options: Omit<Urql.UseQueryArgs<LoggedUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<LoggedUserQuery>({ query: LoggedUserDocument, ...options });
};
export const PostsDocument = gql`
    query Posts($limit: Int!, $cursor: String) {
  posts(limit: $limit, cursor: $cursor) {
    hasMore
    posts {
      _id
      text
      feeling
      activity
      like
      love
      care
      haha
      wow
      sad
      angry
      creatorId
      creator {
        _id
        username
        email
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
}
    `;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};
export const ReactionDocument = gql`
    query Reaction($postId: Int!) {
  reaction(postId: $postId) {
    _id
    reaction
    userId
    value
    postId
  }
}
    `;

export function useReactionQuery(options: Omit<Urql.UseQueryArgs<ReactionQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ReactionQuery>({ query: ReactionDocument, ...options });
};