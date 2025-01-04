import { createInjector, inject, mergeProps } from "unstateless";
import {NewProductsComponent} from "./NewProducts.component";
import {INewProductsInputProps, NewProductsProps, INewProductsProps} from "./NewProducts.d";
import { useProducts } from "@store/lib/product/services";

const injectNewProductsProps = createInjector(({}:INewProductsInputProps):INewProductsProps => {
    const {products, isLoading} = useProducts();
    
    // Get products that are less than 3 months old and sort by releaseDate
    const newProducts = products
        .filter(p => p.enabled)
        .filter((product) => {
            const threeMonthsAgo = new Date();
            threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
            return new Date(product.releaseDate) > threeMonthsAgo;
        })
        .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());

    return {products: newProducts, isLoading};
});

const connect = inject<INewProductsInputProps, NewProductsProps>(mergeProps(
    injectNewProductsProps,
));

export const NewProducts = connect(NewProductsComponent);
