export interface ProductFiltering {
    name: string;
    categories: number[];
    maxPrice: number;
    perPage: number;
    currentPage: number;
    sortBy: string;
}