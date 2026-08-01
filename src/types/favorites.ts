export interface FavoriteArticleItem {
  id: string;
  title: string;
  slug: string;
  image: string;
  category: string;
  views: number;
}

export interface FavoritesManagementProps {
  initialWishlist: FavoriteArticleItem[];
}
