import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";
import { IProduct, IWishlistItem } from "@store-shared/product/types";

export const wishlistServices = ({get, post, remove}:IMethods) => ({
    wishlist: {
        search: (userId:number):Promise<IProduct[]> => get(`user/${userId}/wishlist`).then(getResults<IProduct[]>),
        add:    (userId:number, productId:number):Promise<IWishlistItem> => post(`user/${userId}/wishlist`, {productId}),
        remove: (userId:number, productId:number):Promise<any> => remove(`user/${userId}/wishlist/${productId}`),
    }
});
