import { IToggle } from "@core/lib/useToggle";
import { IProduct } from "@store-shared/product/types";

export declare interface IAddtoCartBtnProps {
    addToCart: () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IAddtoCartBtnInputProps {
    product: IProduct;
}

export type AddtoCartBtnProps = IAddtoCartBtnInputProps & IAddtoCartBtnProps;