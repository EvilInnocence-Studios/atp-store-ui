import { IModal } from "@core/lib/useModal";
import { IProduct } from "@store-shared/product/types";

export declare interface IWishlistBtnProps {
    isLoggedIn: boolean;
    loginModal: IModal;
    add: () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IWishlistBtnInputProps {
    product: IProduct;
    classes?: any;
}

export type WishlistBtnProps = IWishlistBtnInputProps & IWishlistBtnProps;