import { services } from "@core/lib/api";
import { useLoaderAsync } from "@core/lib/useLoader";
import { IProductFull, IProductMedia } from "@store-shared/product/types";
import { useEffect, useState } from "react";
import { memoizePromise } from "ts-functional";
import { Index } from "ts-functional/dist/types";
import { useSharedState } from "unstateless";

const useImageList = useSharedState<Index<IProductMedia>>({});

const loadImage = memoizePromise((productId:string, imageId:string) => services().product.media.get(productId, imageId));

export const useImage = (productId:string, imageId:string | null):[IProductMedia | null, boolean] => {
    const [image, setImage] = useState<IProductMedia | null>(null);
    const loader = useLoaderAsync();

    useEffect(() => {
        if(!!imageId) {
            loader(async () => 
                loadImage(productId, imageId)
                    .then(setImage)
            );
        }
    }, [productId, imageId]);

    return [!!image ? image : null, loader.isLoading];
}

export const useProducts = useSharedState<IProductFull[]>(`products`, []);

export const useProduct = (id:string) => useSharedState<IProductFull | null>(`product-${id}`, null);
