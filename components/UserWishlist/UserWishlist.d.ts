import { IProduct } from "@store-shared/product/types";

export declare interface IUserWishlistProps {
    user: SafeUser;
    wishlist: IProduct[];
    isLoading: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface IUserWishlistInputProps {
    userId?: number;
}

export type UserWishlistProps = IUserWishlistInputProps & IUserWishlistProps;