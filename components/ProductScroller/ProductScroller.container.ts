import { useScrollable } from "@core/useScrollable";
import { IProductFull } from "@store-shared/product/types";
import { useProductList } from "@store/lib/useProductList";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { ProductScrollerComponent } from "./ProductScroller.component";
import { IProductScrollerInputProps, IProductScrollerProps, ProductScrollerProps } from "./ProductScroller.d";

const injectProductScrollerProps = createInjector(({filter, sort, count}:IProductScrollerInputProps):IProductScrollerProps => {
    const {products, isLoading} = useProductList();
    const scroll = useScrollable(10);
    const [newProducts, setNewProducts] = useState<IProductFull[]>([]);

    useEffect(() => {
        setNewProducts(products
            .filter(filter)
            .sort(sort)
            .slice(0, count || 10));
    }, [products]);

    return {products: newProducts, isLoading, scroll};
});

const connect = inject<IProductScrollerInputProps, ProductScrollerProps>(mergeProps(
    injectProductScrollerProps,
));

export const ProductScroller = connect(ProductScrollerComponent);
