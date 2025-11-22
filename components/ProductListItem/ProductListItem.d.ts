import { IProduct } from "@store-shared/product/types";

export declare interface IProductListItemProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IProductListItemInputProps {
    product: IProduct;
    textSize?: "small" | "default" | "large";
    hideTags?: boolean;
    hideCartButton?: boolean;
    classes?: any;
}

export type ProductListItemProps = IProductListItemInputProps & IProductListItemProps;