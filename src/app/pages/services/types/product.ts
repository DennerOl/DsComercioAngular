export interface ProductDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
}

export interface CategoryDTO {
  id: number;
  name: string;
}

export interface ProductCategoryDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  categories: CategoryDTO[];
}
