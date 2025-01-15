import { services } from "@core/lib/api";
import { useLoaderAsync } from "@core/lib/useLoader";
import { IProduct, IProductFull, IProductMedia } from "@store-shared/product/types";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { ProductPageComponent } from "./ProductPage.component";
import { IProductPageInputProps, IProductPageProps, ProductPageProps } from "./ProductPage.d";

const injectProductPageProps = createInjector(({url}:IProductPageInputProps):IProductPageProps => {
    const [product, setProduct] = useState<IProductFull | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
    const [media, setMedia] = useState<IProductMedia[]>([]);
    const loader = useLoaderAsync();

    useEffect(() => {
        loader(async () => {
            const products = await services().product.search({url});
            setProduct(products[0]);
        });
    }, [url]);

    useEffect(() => {
        if(product) {
            loader(async () => {
                const media = await services().product.media.search(product.id);
                setMedia(media);
            });
            loader(async () => {
                const related = await services().product.related.search(product.id);
                setRelatedProducts(related);
            });
        }
    }, [product]);
    
    return {product, media, relatedProducts, isLoading: loader.isLoading};
});

const connect = inject<IProductPageInputProps, ProductPageProps>(mergeProps(
    injectProductPageProps,
));

export const ProductPage = connect(ProductPageComponent);
