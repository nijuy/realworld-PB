/**
 * @CRUD get
 * @Action getArticleData
 */
export interface IArticleData {
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

/**
 * @CRUD get
 * @Action getFeedData
 */
export interface IFeedData {
  articles: IArticleData[];
  articlesCount: number;
}
