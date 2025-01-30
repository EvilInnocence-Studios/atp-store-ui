import { services } from "@core/lib/api";
import { useLoaderAsync } from "@core/lib/useLoader";
import { IProductFull, IProductMedia } from "@store-shared/product/types";
import { useEffect } from "react";
import { Index } from "ts-functional/dist/types";
import { useSharedState } from "unstateless";

const useImageList = useSharedState<Index<IProductMedia>>({});

export const useImage = (productId:number, imageId:number):[IProductMedia | null, boolean] => {
    const [images, setImages] = useImageList();
    const loader = useLoaderAsync();

    useEffect(() => {
        if(!images[`${imageId}`]) {
            loader(async () => {
                services().product.media.get(productId, imageId)
                    .then(image => setImages(oldImages => ({...oldImages, [`${imageId}`]: image})));
            });
        }
    }, [productId, imageId]);

    return [!!images[`${imageId}`] ? images[`${imageId}`] : null, loader.isLoading];
}

export const useProducts = useSharedState<IProductFull[]>(`products`, []);

export const useProduct = (id:string) => useSharedState<IProductFull | null>(`product-${id}`, null);
