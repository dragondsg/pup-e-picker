// Add your own custom types in here
export type Dog = {
  name: string;
  image: string;
  description: string;
  isFavorite: boolean;
  id: number;
};
export type SelectedTab =
  | "none-selected"
  | "favorited"
  | "unfavorited"
  | "create-form";
