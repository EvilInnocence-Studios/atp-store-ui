import { createInjector, inject, mergeProps } from "unstateless";
import {MiniProductComponent} from "./MiniProduct.component";
import {IMiniProductInputProps, MiniProductProps, IMiniProductProps} from "./MiniProduct.d";
import { useEffect, useState } from "react";
import { IProduct } from "@store-shared/product/types";
import { useLoaderAsync } from "@core/lib/useLoader";
import { services } from "@core/lib/api";

const injectMiniProductProps = createInjector(({product, productId}:IMiniProductInputProps):IMiniProductProps => {
    const loader = useLoaderAsync();
    const [prod, setProd] = useState<IProduct | undefined>(product);

    useEffect(() => {
        if (productId && !product) {
            loader(async () => {
                services().product.get(productId).then(setProd);
            });
        } else {
            setProd(product);
        }
    }, [product?.id, productId]);
    
    return {product: prod, isLoading: loader.isLoading};
});

const connect = inject<IMiniProductInputProps, MiniProductProps>(mergeProps(
    injectMiniProductProps,
));

export const MiniProduct = connect(MiniProductComponent);
