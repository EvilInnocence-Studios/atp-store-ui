import { services } from "@core/lib/api";
import { overridable } from "@core/lib/overridable";
import { useLoaderAsync } from "@core/lib/useLoader";
import { IProduct } from "@store-shared/product/types";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { MiniProductComponent } from "./MiniProduct.component";
import { IMiniProductInputProps, IMiniProductProps, MiniProductProps } from "./MiniProduct.d";

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

export const MiniProduct = overridable<IMiniProductInputProps>(connect(MiniProductComponent));
