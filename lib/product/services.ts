import { ITag } from "@common-shared/tag/types";
import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";
import { IProduct, IProductFile, IProductFull, IProductMedia, NewProduct } from "@store-shared/product/types";

export const productServices = ({get, post, /*put,*/ patch, remove}: IMethods) => ({
    product: {
        create: (product:NewProduct):Promise<IProduct> => post('product', product).then(getResults<IProduct>),
        search: (q?:{}):Promise<IProductFull[]> => get('product', q).then(getResults),
        get: (id:string) => get(`product/${id}`).then(getResults),
        update: (id:string, product:Partial<IProduct>) => patch(`product/${id}`, product),
        remove: (id:string) => remove(`product/${id}`),
        media: {
            upload: (productId:string, file:File) => {
                const formData = new FormData();
                formData.append('file', file);
                return post(`product/${productId}/media`, formData).then(getResults);
            },
            get: (productId:string, mediaId:string):Promise<IProductMedia> => get(`product/${productId}/media/${mediaId}`).then(getResults),
            search: (productId:string):Promise<IProductMedia[]> => get(`product/${productId}/media`).then(getResults),
            remove: (productId:string, mediaId:string) => remove(`product/${productId}/media/${mediaId}`),
        },
        tag: {
            search: (productId:string):Promise<ITag[]> => get(`product/${productId}/tag`).then(getResults),
            create: (productId:string, tagId:string) => post(`product/${productId}/tag`, {tagId}),
            remove: (productId:string, tagId:string) => remove(`product/${productId}/tag/${tagId}`),
        },
        related: {
            search: (productId:string) => get(`product/${productId}/related`).then(getResults),
            create: (productId:string, relatedId:string) => post(`product/${productId}/related`, {relatedId}),
            remove: (productId:string, relatedId:string) => remove(`product/${productId}/related/${relatedId}`),
        },
        files: {
            search: (productId:string) => get(`product/${productId}/file`).then(getResults),
            upload: (productId:string, folder: string, file:File) => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('folder', folder);
                return post(`product/${productId}/file`, formData).then(getResults);
            },
            remove: (productId:string, fileId:string) => remove(`product/${productId}/file/${fileId}`),
            download: (productId:string, fileId:string) => get(`product/${productId}/file/${fileId}/download`).then(getResults),
        },
        subProduct: {
            search: (productId:string) => get(`product/${productId}/subProduct`).then(getResults<IProduct>),
            create: (productId:string, subProductId:string) => post(`product/${productId}/subProduct`, {subProductId}).then(getResults<IProduct>),
            remove: (productId:string, subProductId:string) => remove(`product/${productId}/subProduct/${subProductId}`),
        }
    },
    file: {
        get: (userId:string):Promise<IProductFile[]> => get(`user/${userId}/file`).then(getResults<IProductFile[]>),
    },

});
