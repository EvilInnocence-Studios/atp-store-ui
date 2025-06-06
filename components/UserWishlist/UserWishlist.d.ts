import { IProduct } from "@store-shared/product/types";

export declare interface IUserWishlistProps {
    user: SafeUser;
    wishlist: IProduct[];
    isLoading: boolean;
    remove: (productId:string) => () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IUserWishlistInputProps {
    userId?: string;
}

export type UserWishlistProps = IUserWishlistInputProps & IUserWishlistProps;