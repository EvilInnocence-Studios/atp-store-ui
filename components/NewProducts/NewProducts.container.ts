import { useScrollable } from "@core/useScrollable";
import { IProductFull } from "@store-shared/product/types";
import { useProducts } from "@store/lib/product/services";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { NewProductsComponent } from "./NewProducts.component";
import { INewProductsInputProps, INewProductsProps, NewProductsProps } from "./NewProducts.d";

const injectNewProductsProps = createInjector(({count}:INewProductsInputProps):INewProductsProps => {
    const {products, isLoading} = useProducts();
    const scroll = useScrollable(10);
    const [newProducts, setNewProducts] = useState<IProductFull[]>([]);

    useEffect(() => {
        setNewProducts(products
            .filter(p => p.enabled)
            .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
            .slice(0, count || 10));
    }, [products]);

    return {products: newProducts, isLoading, scroll};
});

const connect = inject<INewProductsInputProps, NewProductsProps>(mergeProps(
    injectNewProductsProps,
));

export const NewProducts = connect(NewProductsComponent);
