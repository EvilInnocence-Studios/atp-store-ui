import { IScrollable } from "@core/useScrollable";
import { IProductFull } from "@store-shared/product/types";

export declare interface INewProductsProps {

}

// What gets passed into the component from the parent as attributes
export declare interface INewProductsInputProps {
    count?: number;
    title?: string;
    hideCartButton?: boolean;
    className?: string;
    css?: string;
}

export type NewProductsProps = INewProductsInputProps & INewProductsProps;