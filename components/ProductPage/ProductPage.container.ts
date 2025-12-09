import { services } from "@core/lib/api";
import { useLoaderAsync } from "@core/lib/useLoader";
import { IProduct, IProductFull, IProductMedia } from "@store-shared/product/types";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { ProductPageComponent } from "./ProductPage.component";
import { IProductPageInputProps, IProductPageProps, ProductPageProps } from "./ProductPage.d";
import { useSetting } from "@common/lib/setting/services";

const injectProductPageProps = createInjector(({url}:IProductPageInputProps):IProductPageProps => {
    const [product, setProduct] = useState<IProductFull | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
    const [media, setMedia] = useState<IProductMedia[]>([]);
    const [subProducts, setSubProducts] = useState<IProduct[]>([]);
    const infoUrl = useSetting("subscriptionInfoUrl");
    
    const loader = useLoaderAsync();

    useEffect(() => {
        loader(async () => {
            const products = await services().product.search({url});
            setProduct(products[0]);
        });
    }, [url]);

    useEffect(() => {
        if(product) {
            // Load media
            loader(async () => {
                const media = await services().product.media.search(product.id);
                setMedia(media);
            });

            // Load related products
            loader(async () => {
                const related = await services().product.related.search(product.id);
                setRelatedProducts(related);
            });

            // Load sub products
            if(product.productType === 'grouped') {
                loader(async () => {
                    const subProducts = await services().product.subProduct.search(product.id);
                    setSubProducts(subProducts);
                });
            }
        }
    }, [product]);
    
    return {product, media, relatedProducts, isLoading: loader.isLoading, subProducts, infoUrl};
});

const connect = inject<IProductPageInputProps, ProductPageProps>(mergeProps(
    injectProductPageProps,
));

export const ProductPage = connect(ProductPageComponent);
