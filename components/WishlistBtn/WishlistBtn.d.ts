import { IProduct } from "@store-shared/product/types";

export declare interface IWishlistBtnProps {
    add: () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IWishlistBtnInputProps {
    product: IProduct;
}

export type WishlistBtnProps = IWishlistBtnInputProps & IWishlistBtnProps;