import { ITag } from "@common-shared/tag/types";
import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";
import { IProduct, NewProduct } from "@store-shared/product/types";

export const productServices = ({get, post, /*put,*/ patch, remove}: IMethods) => ({
    product: {
        create: (product:NewProduct) => post('product', product).then(getResults),
        search: () => get('product').then(getResults), // TODO: add filters
        get: (id:number) => get(`product/${id}`).then(getResults),
        update: (id:number, product:Partial<IProduct>) => patch(`product/${id}`, product),
        remove: (id:number) => remove(`product/${id}`),
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