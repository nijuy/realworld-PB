/**
 * @CRUD post
 * @ACTION createArticle
 */
export interface INewArticleRequest {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
}

/**
 * @CRUD get
 * @Action getArticleData
 */
export interface ISingleArticleResponse {
  article: {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: {
      username: string;
      bio: string;
      image: string;
      following: boolean;
    };
  };
}

export interface IArticle {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

/**
 * @CRUD get
 *
 */
export interface INewCommentRequest {
  comment: {
    body: string;
  };
}

export interface IComment {
  id: number;
  createdAt: string;
  updateAt: string;
  body: string;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

export interface IMultipleCommentsResponse {
  comments: IComment[];
}

/**
 * @CRUD get
 * @Action getFeedData
 */
export interface IMultipleArticlesResponse {
  articles: IArticle[];
  articlesCount: number;
}
