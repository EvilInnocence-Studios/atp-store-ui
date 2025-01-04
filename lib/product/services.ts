import { ITag } from "@common-shared/tag/types";
import { services } from "@core/lib/api";
import { IMethods } from "@core/lib/types";
import { useLoader } from "@core/lib/useLoader";
import { getResults } from "@core/lib/util";
import { IProduct, IProductFull, IProductMedia, NewProduct } from "@store-shared/product/types";
import { useEffect } from "react";
import { useSharedState } from "unstateless";

export const productServices = ({get, post, /*put,*/ patch, remove}: IMethods) => ({
    product: {
        create: (product:NewProduct) => post('product', product).then(getResults),
        search: ():Promise<IProductFull[]> => get('product').then(getResults), // TODO: add filters
        get: (id:number) => get(`product/${id}`).then(getResults),
        update: (id:number, product:Partial<IProduct>) => patch(`product/${id}`, product),
        remove: (id:number) => remove(`product/${id}`),
        media: {
            upload: (productId:number, file:File) => {
                const formData = new FormData();
                formData.append('file', file);
                return post(`product/${productId}/media`, formData).then(getResults);
            },
            get: (productId:number, mediaId:number):Promise<IProductMedia> => get(`product/${productId}/media/${mediaId}`).then(getResults),
            search: (productId:number) => get(`product/${productId}/media`).then(getResults),
            remove: (productId:number, mediaId:number) => remove(`product/${productId}/media/${mediaId}`),
        },
        tag: {
            search: (productId:number):Promise<ITag[]> => get(`product/${productId}/tag`).then(getResults),
            create: (productId:number, tagId:number) => post(`product/${productId}/tag`, {tagId}),
            remove: (productId:number, tagId:number) => remove(`product/${productId}/tag/${tagId}`),
        },
        related: {
            search: (productId:number) => get(`product/${productId}/related`).then(getResults),
            create: (productId:number, relatedId:number) => post(`product/${productId}/related`, {relatedId}),
            remove: (productId:number, relatedId:number) => remove(`product/${productId}/related/${relatedId}`),
        },
    }
});

export const useProducts = () => {
    const [products, setProducts] = useSharedState<IProductFull[]>("productList", [])();
    const loader = useLoader();
    
    useEffect(() => {
        if(products.length === 0) {
            loader.start();
            services().product.search()
                .then(setProducts)
                .finally(loader.stop);
        }
    }, []);

    return {products, isLoading: loader.isLoading};

}