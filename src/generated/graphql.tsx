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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Comment = {
  __typename?: 'Comment';
  _id: Scalars['Int'];
  text: Scalars['String'];
  creatorId: Scalars['Float'];
  creator: User;
  postId: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
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

export type FriendRequest = {
  __typename?: 'FriendRequest';
  status: Scalars['String'];
  sender: Scalars['Float'];
  receiver: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type FriendRequestWithFriend = {
  __typename?: 'FriendRequestWithFriend';
  friendRequest: FriendRequest;
  friend: User;
};

export type FullUser = {
  __typename?: 'FullUser';
  user?: Maybe<User>;
  avatarImage?: Maybe<Scalars['String']>;
  bannerImage?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  uploadImage: Scalars['String'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  react: Scalars['Boolean'];
  createComment: Comment;
  createFriendRequest: Scalars['Boolean'];
  acceptFriendRequest: Scalars['Boolean'];
  removeFriendRequest: Scalars['Boolean'];
};


export type MutationCreatePostArgs = {
  image?: Maybe<Scalars['Upload']>;
  input: PostInput;
};


export type MutationUpdatePostArgs = {
  text?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationUploadImageArgs = {
  avatarOrBanner: Scalars['String'];
  image?: Maybe<Scalars['Upload']>;
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


export type MutationCreateCommentArgs = {
  postId: Scalars['Int'];
  text: Scalars['String'];
};


export type MutationCreateFriendRequestArgs = {
  receiverId: Scalars['Int'];
};


export type MutationAcceptFriendRequestArgs = {
  userId: Scalars['Int'];
};


export type MutationRemoveFriendRequestArgs = {
  userId: Scalars['Int'];
};

export type PaginatedComments = {
  __typename?: 'PaginatedComments';
  comments: Array<Comment>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  posts: Array<Post>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedRequests = {
  __typename?: 'PaginatedRequests';
  friendRequestsWithFriends: Array<FriendRequestWithFriend>;
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
  imageId: Scalars['String'];
  tagged: Array<Scalars['Int']>;
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
  tagged: Array<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  posts: PaginatedPosts;
  post?: Maybe<Post>;
  getPostsByCreatorId: PaginatedPosts;
  getImage: Scalars['String'];
  getUserById?: Maybe<User>;
  loggedUser?: Maybe<FullUser>;
  reactions: Array<Reaction>;
  reaction?: Maybe<Reaction>;
  getPostComments: PaginatedComments;
  commentCount: Scalars['Int'];
  friendRequests: Array<FriendRequest>;
  getUserFriendRequests: PaginatedRequests;
  getFriendRequest: UserRequest;
  getSuggestedFriendTags: Array<FriendRequestWithFriend>;
  friendCount: Scalars['Int'];
};


export type QueryPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryGetPostsByCreatorIdArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  creatorId: Scalars['Int'];
};


export type QueryGetImageArgs = {
  imageId: Scalars['String'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Int'];
};


export type QueryReactionArgs = {
  postId: Scalars['Int'];
};


export type QueryGetPostCommentsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
  postId: Scalars['Int'];
};


export type QueryCommentCountArgs = {
  postId: Scalars['Int'];
};


export type QueryGetUserFriendRequestsArgs = {
  skip?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};


export type QueryGetFriendRequestArgs = {
  userId: Scalars['Int'];
};


export type QueryGetSuggestedFriendTagsArgs = {
  searchName?: Maybe<Scalars['String']>;
};


export type QueryFriendCountArgs = {
  userId?: Maybe<Scalars['Int']>;
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
  avatarId: Scalars['String'];
  bannerId: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserRequest = {
  __typename?: 'UserRequest';
  friendRequest?: Maybe<FriendRequest>;
  isSender: Scalars['Boolean'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  loggedUser?: Maybe<FullUser>;
};

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularFriendRequestFragment = (
  { __typename?: 'FriendRequest' }
  & Pick<FriendRequest, 'sender' | 'receiver' | 'status' | 'createdAt' | 'updatedAt'>
);

export type RegularPostFragment = (
  { __typename?: 'Post' }
  & Pick<Post, '_id' | 'text' | 'feeling' | 'activity' | 'tagged' | 'imageId' | 'creatorId' | 'createdAt' | 'updatedAt'>
  & { creator: (
    { __typename?: 'User' }
    & RegularUserFragment
  ) }
  & RegularReactionsFragment
);

export type RegularReactionsFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'like' | 'love' | 'care' | 'haha' | 'wow' | 'sad' | 'angry'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, '_id' | 'username' | 'email' | 'avatarId' | 'bannerId' | 'createdAt' | 'updatedAt'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, loggedUser?: Maybe<(
    { __typename?: 'FullUser' }
    & Pick<FullUser, 'avatarImage' | 'bannerImage'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  )> }
);

export type AcceptFriendRequestMutationVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type AcceptFriendRequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'acceptFriendRequest'>
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

export type CreateCommentMutationVariables = Exact<{
  postId: Scalars['Int'];
  text: Scalars['String'];
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment: (
    { __typename?: 'Comment' }
    & Pick<Comment, '_id' | 'text' | 'postId' | 'creatorId'>
  ) }
);

export type CreateFriendRequestMutationVariables = Exact<{
  receiver: Scalars['Int'];
}>;


export type CreateFriendRequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createFriendRequest'>
);

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
  image?: Maybe<Scalars['Upload']>;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & Pick<Post, '_id' | 'creatorId' | 'text' | 'feeling' | 'activity' | 'imageId' | 'like' | 'love' | 'care' | 'haha' | 'wow' | 'sad' | 'angry' | 'createdAt' | 'updatedAt'>
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

export type RemoveFriendRequestMutationVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type RemoveFriendRequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeFriendRequest'>
);

export type UploadUserImageMutationVariables = Exact<{
  image?: Maybe<Scalars['Upload']>;
  avatarOrBanner: Scalars['String'];
}>;


export type UploadUserImageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'uploadImage'>
);

export type CommentCountQueryVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type CommentCountQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'commentCount'>
);

export type FriendCountQueryVariables = Exact<{
  userId?: Maybe<Scalars['Int']>;
}>;


export type FriendCountQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'friendCount'>
);

export type GetFriendRequestQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type GetFriendRequestQuery = (
  { __typename?: 'Query' }
  & { getFriendRequest: (
    { __typename?: 'UserRequest' }
    & Pick<UserRequest, 'isSender'>
    & { friendRequest?: Maybe<(
      { __typename?: 'FriendRequest' }
      & RegularFriendRequestFragment
    )> }
  ) }
);

export type GetImageQueryVariables = Exact<{
  imageId: Scalars['String'];
}>;


export type GetImageQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getImage'>
);

export type GetPostCommentsQueryVariables = Exact<{
  postId: Scalars['Int'];
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
}>;


export type GetPostCommentsQuery = (
  { __typename?: 'Query' }
  & { getPostComments: (
    { __typename?: 'PaginatedComments' }
    & Pick<PaginatedComments, 'hasMore'>
    & { comments: Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, '_id' | 'text' | 'postId' | 'creatorId' | 'createdAt' | 'updatedAt'>
      & { creator: (
        { __typename?: 'User' }
        & RegularUserFragment
      ) }
    )> }
  ) }
);

export type GetPostsByCreatorIdQueryVariables = Exact<{
  creatorId: Scalars['Int'];
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type GetPostsByCreatorIdQuery = (
  { __typename?: 'Query' }
  & { getPostsByCreatorId: (
    { __typename?: 'PaginatedPosts' }
    & Pick<PaginatedPosts, 'hasMore'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & RegularPostFragment
    )> }
  ) }
);

export type GetSuggestedFriendTagsQueryVariables = Exact<{
  searchName?: Maybe<Scalars['String']>;
}>;


export type GetSuggestedFriendTagsQuery = (
  { __typename?: 'Query' }
  & { getSuggestedFriendTags: Array<(
    { __typename?: 'FriendRequestWithFriend' }
    & { friend: (
      { __typename?: 'User' }
      & RegularUserFragment
    ), friendRequest: (
      { __typename?: 'FriendRequest' }
      & RegularFriendRequestFragment
    ) }
  )> }
);

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetUserByIdQuery = (
  { __typename?: 'Query' }
  & { getUserById?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type GetUserFriendRequestsQueryVariables = Exact<{
  userId?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
  skip?: Maybe<Scalars['Int']>;
}>;


export type GetUserFriendRequestsQuery = (
  { __typename?: 'Query' }
  & { getUserFriendRequests: (
    { __typename?: 'PaginatedRequests' }
    & Pick<PaginatedRequests, 'hasMore'>
    & { friendRequestsWithFriends: Array<(
      { __typename?: 'FriendRequestWithFriend' }
      & { friendRequest: (
        { __typename?: 'FriendRequest' }
        & RegularFriendRequestFragment
      ), friend: (
        { __typename?: 'User' }
        & RegularUserFragment
      ) }
    )> }
  ) }
);

export type LoggedUserQueryVariables = Exact<{ [key: string]: never; }>;


export type LoggedUserQuery = (
  { __typename?: 'Query' }
  & { loggedUser?: Maybe<(
    { __typename?: 'FullUser' }
    & Pick<FullUser, 'avatarImage' | 'bannerImage'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
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
      & RegularPostFragment
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

export const RegularFriendRequestFragmentDoc = gql`
    fragment RegularFriendRequest on FriendRequest {
  sender
  receiver
  status
  createdAt
  updatedAt
}
    `;
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
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  _id
  username
  email
  avatarId
  bannerId
  createdAt
  updatedAt
}
    `;
export const RegularPostFragmentDoc = gql`
    fragment RegularPost on Post {
  _id
  text
  feeling
  activity
  tagged
  imageId
  ...RegularReactions
  creatorId
  creator {
    ...RegularUser
  }
  createdAt
  updatedAt
}
    ${RegularReactionsFragmentDoc}
${RegularUserFragmentDoc}`;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  loggedUser {
    user {
      ...RegularUser
    }
    avatarImage
    bannerImage
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const AcceptFriendRequestDocument = gql`
    mutation AcceptFriendRequest($userId: Int!) {
  acceptFriendRequest(userId: $userId)
}
    `;

export function useAcceptFriendRequestMutation() {
  return Urql.useMutation<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>(AcceptFriendRequestDocument);
};
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
export const CreateCommentDocument = gql`
    mutation CreateComment($postId: Int!, $text: String!) {
  createComment(postId: $postId, text: $text) {
    _id
    text
    postId
    creatorId
  }
}
    `;

export function useCreateCommentMutation() {
  return Urql.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument);
};
export const CreateFriendRequestDocument = gql`
    mutation CreateFriendRequest($receiver: Int!) {
  createFriendRequest(receiverId: $receiver)
}
    `;

export function useCreateFriendRequestMutation() {
  return Urql.useMutation<CreateFriendRequestMutation, CreateFriendRequestMutationVariables>(CreateFriendRequestDocument);
};
export const CreatePostDocument = gql`
    mutation CreatePost($input: PostInput!, $image: Upload) {
  createPost(input: $input, image: $image) {
    _id
    creatorId
    text
    feeling
    activity
    imageId
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
export const RemoveFriendRequestDocument = gql`
    mutation RemoveFriendRequest($userId: Int!) {
  removeFriendRequest(userId: $userId)
}
    `;

export function useRemoveFriendRequestMutation() {
  return Urql.useMutation<RemoveFriendRequestMutation, RemoveFriendRequestMutationVariables>(RemoveFriendRequestDocument);
};
export const UploadUserImageDocument = gql`
    mutation UploadUserImage($image: Upload, $avatarOrBanner: String!) {
  uploadImage(image: $image, avatarOrBanner: $avatarOrBanner)
}
    `;

export function useUploadUserImageMutation() {
  return Urql.useMutation<UploadUserImageMutation, UploadUserImageMutationVariables>(UploadUserImageDocument);
};
export const CommentCountDocument = gql`
    query CommentCount($postId: Int!) {
  commentCount(postId: $postId)
}
    `;

export function useCommentCountQuery(options: Omit<Urql.UseQueryArgs<CommentCountQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CommentCountQuery>({ query: CommentCountDocument, ...options });
};
export const FriendCountDocument = gql`
    query FriendCount($userId: Int) {
  friendCount(userId: $userId)
}
    `;

export function useFriendCountQuery(options: Omit<Urql.UseQueryArgs<FriendCountQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FriendCountQuery>({ query: FriendCountDocument, ...options });
};
export const GetFriendRequestDocument = gql`
    query GetFriendRequest($userId: Int!) {
  getFriendRequest(userId: $userId) {
    friendRequest {
      ...RegularFriendRequest
    }
    isSender
  }
}
    ${RegularFriendRequestFragmentDoc}`;

export function useGetFriendRequestQuery(options: Omit<Urql.UseQueryArgs<GetFriendRequestQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetFriendRequestQuery>({ query: GetFriendRequestDocument, ...options });
};
export const GetImageDocument = gql`
    query GetImage($imageId: String!) {
  getImage(imageId: $imageId)
}
    `;

export function useGetImageQuery(options: Omit<Urql.UseQueryArgs<GetImageQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetImageQuery>({ query: GetImageDocument, ...options });
};
export const GetPostCommentsDocument = gql`
    query getPostComments($postId: Int!, $limit: Int!, $offset: Int) {
  getPostComments(postId: $postId, limit: $limit, offset: $offset) {
    hasMore
    comments {
      _id
      text
      postId
      creatorId
      createdAt
      updatedAt
      creator {
        ...RegularUser
      }
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useGetPostCommentsQuery(options: Omit<Urql.UseQueryArgs<GetPostCommentsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPostCommentsQuery>({ query: GetPostCommentsDocument, ...options });
};
export const GetPostsByCreatorIdDocument = gql`
    query GetPostsByCreatorId($creatorId: Int!, $limit: Int!, $cursor: String) {
  getPostsByCreatorId(creatorId: $creatorId, limit: $limit, cursor: $cursor) {
    hasMore
    posts {
      ...RegularPost
    }
  }
}
    ${RegularPostFragmentDoc}`;

export function useGetPostsByCreatorIdQuery(options: Omit<Urql.UseQueryArgs<GetPostsByCreatorIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPostsByCreatorIdQuery>({ query: GetPostsByCreatorIdDocument, ...options });
};
export const GetSuggestedFriendTagsDocument = gql`
    query GetSuggestedFriendTags($searchName: String) {
  getSuggestedFriendTags(searchName: $searchName) {
    friend {
      ...RegularUser
    }
    friendRequest {
      ...RegularFriendRequest
    }
  }
}
    ${RegularUserFragmentDoc}
${RegularFriendRequestFragmentDoc}`;

export function useGetSuggestedFriendTagsQuery(options: Omit<Urql.UseQueryArgs<GetSuggestedFriendTagsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetSuggestedFriendTagsQuery>({ query: GetSuggestedFriendTagsDocument, ...options });
};
export const GetUserByIdDocument = gql`
    query GetUserById($id: Int!) {
  getUserById(id: $id) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useGetUserByIdQuery(options: Omit<Urql.UseQueryArgs<GetUserByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserByIdQuery>({ query: GetUserByIdDocument, ...options });
};
export const GetUserFriendRequestsDocument = gql`
    query GetUserFriendRequests($userId: Int, $limit: Int!, $skip: Int) {
  getUserFriendRequests(userId: $userId, limit: $limit, skip: $skip) {
    hasMore
    friendRequestsWithFriends {
      friendRequest {
        ...RegularFriendRequest
      }
      friend {
        ...RegularUser
      }
    }
  }
}
    ${RegularFriendRequestFragmentDoc}
${RegularUserFragmentDoc}`;

export function useGetUserFriendRequestsQuery(options: Omit<Urql.UseQueryArgs<GetUserFriendRequestsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserFriendRequestsQuery>({ query: GetUserFriendRequestsDocument, ...options });
};
export const LoggedUserDocument = gql`
    query loggedUser {
  loggedUser {
    user {
      ...RegularUser
    }
    avatarImage
    bannerImage
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
      ...RegularPost
    }
  }
}
    ${RegularPostFragmentDoc}`;

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