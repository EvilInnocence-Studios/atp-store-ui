import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";
import { IWishlistItem } from "@store-shared/order/types";
import { IProduct } from "@store-shared/product/types";

export const wishlistServices = ({get, post, remove}:IMethods) => ({
    wishlist: {
        search: (userId:string):Promise<IProduct[]> => get(`user/${userId}/wishlist`).then(getResults<IProduct[]>),
        add:    (userId:string, productId:string):Promise<IWishlistItem> => post(`user/${userId}/wishlist`, {productId}),
        remove: (userId:string, productId:string):Promise<any> => remove(`user/${userId}/wishlist/${productId}`),
    }
});
