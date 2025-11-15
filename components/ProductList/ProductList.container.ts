import { overridable } from "@core/lib/overridable";
import { IProductFull } from "@store-shared/product/types";
import { useProductList } from "@store/lib/useProductList";
import { prop, sort } from "ts-functional";
import { createInjector, inject, mergeProps } from "unstateless";
import { ProductListComponent } from "./ProductList.component";
import { IProductListInputProps, IProductListProps, ProductListProps } from "./ProductList.d";
import { randomProducts } from "./ProductList.helpers";

const injectProductListProps = createInjector(({}:IProductListInputProps):IProductListProps => {
    const {products, isLoading} = useProductList();

    const sortedProducts = randomProducts(products).sort(sort.by(prop<IProductFull, 'releaseDate'>('releaseDate')).desc);
    
    return {products: sortedProducts, isLoading};
});

const connect = inject<IProductListInputProps, ProductListProps>(mergeProps(
    injectProductListProps,
));
export const connectProductList = connect;

export const ProductList = overridable<IProductListInputProps>(connect(ProductListComponent));
