import { ITag } from "@common-shared/tag/types";
import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";
import { IProduct, IProductMedia, NewProduct } from "@store-shared/product/types";

export const productServices = ({get, post, /*put,*/ patch, remove}: IMethods) => ({
    product: {
        create: (product:NewProduct) => post('product', product).then(getResults),
        search: () => get('product').then(getResults), // TODO: add filters
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
        files: {
            search: (productId:number) => get(`product/${productId}/file`).then(getResults),
            upload: (productId:number, folder: string, file:File) => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('folder', folder);
                return post(`product/${productId}/file`, formData).then(getResults);
            },
            remove: (productId:number, fileId:number) => remove(`product/${productId}/file/${fileId}`),
            download: (productId:number, fileId:number) => get(`product/${productId}/file/${fileId}/download`).then(getResults),
        }
    }
});