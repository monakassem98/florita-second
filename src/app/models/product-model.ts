export interface CompositionItem {
  name: string;
  quantity: number;
  unit: string;
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  imgUrl: string;
  category: string;
  composition: CompositionItem[];
}

export interface ICategory {
  name: string;
  imgUrl: string;
  link: string;
}
