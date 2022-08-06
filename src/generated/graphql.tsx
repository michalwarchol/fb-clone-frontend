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
  senderId: Scalars['Float'];
  sender: User;
  receiverId: Scalars['Float'];
  receiver: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type FriendRequestWithFriend = {
  __typename?: 'FriendRequestWithFriend';
  friendRequest: FriendRequest;
  friendRole: Scalars['String'];
};

export type FriendSuggestion = {
  __typename?: 'FriendSuggestion';
  friend: User;
  mutual: Scalars['Int'];
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
  react: Scalars['Boolean'];
  createComment: Comment;
  createFriendRequest: Scalars['Boolean'];
  acceptFriendRequest: Scalars['Boolean'];
  removeFriendRequest: Scalars['Boolean'];
  createStory: Story;
  createNotification: Scalars['Boolean'];
  updateNotificationStatus: Scalars['Boolean'];
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


export type MutationCreateStoryArgs = {
  image?: Maybe<Scalars['Upload']>;
  input: StoryInput;
};


export type MutationCreateNotificationArgs = {
  input: NotificationInput;
};


export type MutationUpdateNotificationStatusArgs = {
  notifications: Array<Scalars['Int']>;
};

export type Notification = {
  __typename?: 'Notification';
  _id: Scalars['Int'];
  info: Scalars['String'];
  type: NotificationType;
  status: Scalars['String'];
  receiverId: Scalars['Int'];
  postId?: Maybe<Scalars['Int']>;
  triggerId: Scalars['Int'];
  triggerUser: User;
  link: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type NotificationInput = {
  info: Scalars['String'];
  type: NotificationType;
  receiverId: Scalars['Int'];
  link?: Maybe<Scalars['String']>;
  postId?: Maybe<Scalars['Int']>;
};

/** Types of notifications you can get */
export enum NotificationType {
  Info = 'INFO',
  Reaction = 'REACTION',
  Comment = 'COMMENT',
  FriendReq = 'FRIEND_REQ',
  FriendAccept = 'FRIEND_ACCEPT',
  Tag = 'TAG'
}

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
  mutualFriends: Scalars['Int'];
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
  posts: PaginatedPosts;
  post?: Maybe<Post>;
  getImage: Scalars['String'];
  getUsers: Array<User>;
  getUserById?: Maybe<User>;
  searchUsersByUsername: Array<SearchedUser>;
  loggedUser?: Maybe<FullUser>;
  reactions: Array<Reaction>;
  reaction?: Maybe<Reaction>;
  getPostComments: PaginatedComments;
  commentCount: Scalars['Int'];
  friendRequests: Array<FriendRequest>;
  getUserFriendRequests: PaginatedRequests;
  getFriendRequest: UserRequest;
  getSuggestedFriendTags: Array<FriendRequestWithFriend>;
  getSuggestedFriends: Array<FriendSuggestion>;
  getInProgressFriendRequests: Array<FriendRequestWithFriend>;
  friendCount: Scalars['Int'];
  getStories: Array<Story>;
  getRecentStories: Array<Story>;
  getNotifications: Array<Notification>;
  getUserNotifications: Array<Notification>;
  getNewNotificationsCount: Scalars['Int'];
};


export type QueryPostsArgs = {
  creatorId?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryGetImageArgs = {
  imageId: Scalars['String'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Int'];
};


export type QuerySearchUsersByUsernameArgs = {
  username: Scalars['String'];
};


export type QueryReactionArgs = {
  postId: Scalars['Int'];
};


export type QueryGetPostCommentsArgs = {
  cursor?: Maybe<Scalars['String']>;
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

export type SearchedUser = {
  __typename?: 'SearchedUser';
  _id: Scalars['Int'];
  username: Scalars['String'];
  avatarImage?: Maybe<Scalars['String']>;
};

export type Story = {
  __typename?: 'Story';
  _id: Scalars['Float'];
  userId: Scalars['Float'];
  creator: User;
  text?: Maybe<Scalars['String']>;
  font?: Maybe<Scalars['String']>;
  gradient?: Maybe<Scalars['String']>;
  time: Scalars['Float'];
  imageId?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type StoryInput = {
  text?: Maybe<Scalars['String']>;
  font?: Maybe<Scalars['String']>;
  gradient?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Float']>;
};


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
  & Pick<FriendRequest, 'senderId' | 'receiverId' | 'status' | 'createdAt' | 'updatedAt'>
);

export type RegularNotificationFragment = (
  { __typename?: 'Notification' }
  & Pick<Notification, '_id' | 'info' | 'type' | 'status' | 'link' | 'postId' | 'receiverId' | 'triggerId' | 'createdAt' | 'updatedAt'>
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

export type RegularStoryFragment = (
  { __typename?: 'Story' }
  & Pick<Story, '_id' | 'userId' | 'text' | 'font' | 'gradient' | 'imageId' | 'time' | 'createdAt' | 'updatedAt'>
  & { creator: (
    { __typename?: 'User' }
    & RegularUserFragment
  ) }
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

export type CreateNotificationMutationVariables = Exact<{
  input: NotificationInput;
}>;


export type CreateNotificationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createNotification'>
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

export type CreateStoryMutationVariables = Exact<{
  input: StoryInput;
  image?: Maybe<Scalars['Upload']>;
}>;


export type CreateStoryMutation = (
  { __typename?: 'Mutation' }
  & { createStory: (
    { __typename?: 'Story' }
    & Pick<Story, '_id' | 'userId' | 'text' | 'font' | 'gradient' | 'time' | 'imageId' | 'createdAt' | 'updatedAt'>
  ) }
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

export type UpdateNotificationStatusMutationVariables = Exact<{
  notifications: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type UpdateNotificationStatusMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateNotificationStatus'>
);

export type UploadUserImageMutationVariables = Exact<{
  image?: Maybe<Scalars['Upload']>;
  avatarOrBanner: Scalars['String'];
}>;


export type UploadUserImageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'uploadImage'>
);

export type SearchUsersByUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type SearchUsersByUsernameQuery = (
  { __typename?: 'Query' }
  & { searchUsersByUsername: Array<(
    { __typename?: 'SearchedUser' }
    & Pick<SearchedUser, '_id' | 'username' | 'avatarImage'>
  )> }
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

export type GetInProgressFriendRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInProgressFriendRequestsQuery = (
  { __typename?: 'Query' }
  & { getInProgressFriendRequests: Array<(
    { __typename?: 'FriendRequestWithFriend' }
    & Pick<FriendRequestWithFriend, 'friendRole'>
    & { friendRequest: (
      { __typename?: 'FriendRequest' }
      & { sender: (
        { __typename?: 'User' }
        & RegularUserFragment
      ), receiver: (
        { __typename?: 'User' }
        & RegularUserFragment
      ) }
      & RegularFriendRequestFragment
    ) }
  )> }
);

export type GetNewNotificationsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNewNotificationsCountQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getNewNotificationsCount'>
);

export type GetPostCommentsQueryVariables = Exact<{
  postId: Scalars['Int'];
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
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

export type GetRecentStoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecentStoriesQuery = (
  { __typename?: 'Query' }
  & { getRecentStories: Array<(
    { __typename?: 'Story' }
    & RegularStoryFragment
  )> }
);

export type GetSuggestedFriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSuggestedFriendsQuery = (
  { __typename?: 'Query' }
  & { getSuggestedFriends: Array<(
    { __typename?: 'FriendSuggestion' }
    & Pick<FriendSuggestion, 'mutual'>
    & { friend: (
      { __typename?: 'User' }
      & RegularUserFragment
    ) }
  )> }
);

export type GetSuggestedFriendTagsQueryVariables = Exact<{
  searchName?: Maybe<Scalars['String']>;
}>;


export type GetSuggestedFriendTagsQuery = (
  { __typename?: 'Query' }
  & { getSuggestedFriendTags: Array<(
    { __typename?: 'FriendRequestWithFriend' }
    & Pick<FriendRequestWithFriend, 'friendRole'>
    & { friendRequest: (
      { __typename?: 'FriendRequest' }
      & { sender: (
        { __typename?: 'User' }
        & RegularUserFragment
      ), receiver: (
        { __typename?: 'User' }
        & RegularUserFragment
      ) }
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
    & Pick<PaginatedRequests, 'mutualFriends' | 'hasMore'>
    & { friendRequestsWithFriends: Array<(
      { __typename?: 'FriendRequestWithFriend' }
      & Pick<FriendRequestWithFriend, 'friendRole'>
      & { friendRequest: (
        { __typename?: 'FriendRequest' }
        & { sender: (
          { __typename?: 'User' }
          & RegularUserFragment
        ), receiver: (
          { __typename?: 'User' }
          & RegularUserFragment
        ) }
        & RegularFriendRequestFragment
      ) }
    )> }
  ) }
);

export type GetUserNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserNotificationsQuery = (
  { __typename?: 'Query' }
  & { getUserNotifications: Array<(
    { __typename?: 'Notification' }
    & { triggerUser: (
      { __typename?: 'User' }
      & RegularUserFragment
    ) }
    & RegularNotificationFragment
  )> }
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
  creatorId?: Maybe<Scalars['Int']>;
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
  senderId
  receiverId
  status
  createdAt
  updatedAt
}
    `;
export const RegularNotificationFragmentDoc = gql`
    fragment RegularNotification on Notification {
  _id
  info
  type
  status
  link
  postId
  receiverId
  triggerId
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
export const RegularStoryFragmentDoc = gql`
    fragment RegularStory on Story {
  _id
  userId
  text
  font
  gradient
  imageId
  time
  creator {
    ...RegularUser
  }
  createdAt
  updatedAt
}
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
export const CreateNotificationDocument = gql`
    mutation CreateNotification($input: NotificationInput!) {
  createNotification(input: $input)
}
    `;

export function useCreateNotificationMutation() {
  return Urql.useMutation<CreateNotificationMutation, CreateNotificationMutationVariables>(CreateNotificationDocument);
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
export const CreateStoryDocument = gql`
    mutation CreateStory($input: StoryInput!, $image: Upload) {
  createStory(input: $input, image: $image) {
    _id
    userId
    text
    font
    gradient
    time
    imageId
    createdAt
    updatedAt
  }
}
    `;

export function useCreateStoryMutation() {
  return Urql.useMutation<CreateStoryMutation, CreateStoryMutationVariables>(CreateStoryDocument);
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
export const UpdateNotificationStatusDocument = gql`
    mutation UpdateNotificationStatus($notifications: [Int!]!) {
  updateNotificationStatus(notifications: $notifications)
}
    `;

export function useUpdateNotificationStatusMutation() {
  return Urql.useMutation<UpdateNotificationStatusMutation, UpdateNotificationStatusMutationVariables>(UpdateNotificationStatusDocument);
};
export const UploadUserImageDocument = gql`
    mutation UploadUserImage($image: Upload, $avatarOrBanner: String!) {
  uploadImage(image: $image, avatarOrBanner: $avatarOrBanner)
}
    `;

export function useUploadUserImageMutation() {
  return Urql.useMutation<UploadUserImageMutation, UploadUserImageMutationVariables>(UploadUserImageDocument);
};
export const SearchUsersByUsernameDocument = gql`
    query SearchUsersByUsername($username: String!) {
  searchUsersByUsername(username: $username) {
    _id
    username
    avatarImage
  }
}
    `;

export function useSearchUsersByUsernameQuery(options: Omit<Urql.UseQueryArgs<SearchUsersByUsernameQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SearchUsersByUsernameQuery>({ query: SearchUsersByUsernameDocument, ...options });
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
export const GetInProgressFriendRequestsDocument = gql`
    query GetInProgressFriendRequests {
  getInProgressFriendRequests {
    friendRequest {
      ...RegularFriendRequest
      sender {
        ...RegularUser
      }
      receiver {
        ...RegularUser
      }
    }
    friendRole
  }
}
    ${RegularFriendRequestFragmentDoc}
${RegularUserFragmentDoc}`;

export function useGetInProgressFriendRequestsQuery(options: Omit<Urql.UseQueryArgs<GetInProgressFriendRequestsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetInProgressFriendRequestsQuery>({ query: GetInProgressFriendRequestsDocument, ...options });
};
export const GetNewNotificationsCountDocument = gql`
    query GetNewNotificationsCount {
  getNewNotificationsCount
}
    `;

export function useGetNewNotificationsCountQuery(options: Omit<Urql.UseQueryArgs<GetNewNotificationsCountQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetNewNotificationsCountQuery>({ query: GetNewNotificationsCountDocument, ...options });
};
export const GetPostCommentsDocument = gql`
    query getPostComments($postId: Int!, $limit: Int!, $cursor: String) {
  getPostComments(postId: $postId, limit: $limit, cursor: $cursor) {
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
export const GetRecentStoriesDocument = gql`
    query GetRecentStories {
  getRecentStories {
    ...RegularStory
  }
}
    ${RegularStoryFragmentDoc}`;

export function useGetRecentStoriesQuery(options: Omit<Urql.UseQueryArgs<GetRecentStoriesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetRecentStoriesQuery>({ query: GetRecentStoriesDocument, ...options });
};
export const GetSuggestedFriendsDocument = gql`
    query GetSuggestedFriends {
  getSuggestedFriends {
    friend {
      ...RegularUser
    }
    mutual
  }
}
    ${RegularUserFragmentDoc}`;

export function useGetSuggestedFriendsQuery(options: Omit<Urql.UseQueryArgs<GetSuggestedFriendsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetSuggestedFriendsQuery>({ query: GetSuggestedFriendsDocument, ...options });
};
export const GetSuggestedFriendTagsDocument = gql`
    query GetSuggestedFriendTags($searchName: String) {
  getSuggestedFriendTags(searchName: $searchName) {
    friendRequest {
      ...RegularFriendRequest
      sender {
        ...RegularUser
      }
      receiver {
        ...RegularUser
      }
    }
    friendRole
  }
}
    ${RegularFriendRequestFragmentDoc}
${RegularUserFragmentDoc}`;

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
    mutualFriends
    hasMore
    friendRequestsWithFriends {
      friendRequest {
        ...RegularFriendRequest
        sender {
          ...RegularUser
        }
        receiver {
          ...RegularUser
        }
      }
      friendRole
    }
  }
}
    ${RegularFriendRequestFragmentDoc}
${RegularUserFragmentDoc}`;

export function useGetUserFriendRequestsQuery(options: Omit<Urql.UseQueryArgs<GetUserFriendRequestsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserFriendRequestsQuery>({ query: GetUserFriendRequestsDocument, ...options });
};
export const GetUserNotificationsDocument = gql`
    query GetUserNotifications {
  getUserNotifications {
    ...RegularNotification
    triggerUser {
      ...RegularUser
    }
  }
}
    ${RegularNotificationFragmentDoc}
${RegularUserFragmentDoc}`;

export function useGetUserNotificationsQuery(options: Omit<Urql.UseQueryArgs<GetUserNotificationsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserNotificationsQuery>({ query: GetUserNotificationsDocument, ...options });
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
    query Posts($limit: Int!, $cursor: String, $creatorId: Int) {
  posts(limit: $limit, cursor: $cursor, creatorId: $creatorId) {
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