import { IProductContextProps } from "@store/lib/context";
import { ILayoutComponent } from "@theming/lib/layout/componentRegistry";

export declare interface IWishlistBtnProps {
    isLoggedIn: boolean;
    loginModal: IModal;
    add: () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IWishlistBtnInputProps {
    className?: string;
    css?: string;
    classes?: any;
    slots?: Index<ILayoutComponent[]>;
    __layoutId?: string;
    id?: string | null;
}

export type WishlistBtnProps = IWishlistBtnInputProps & IProductContextProps & IWishlistBtnProps;
