import { IProductFull } from "@store-shared/product/types";

export declare interface INewProductsProps {
    products:IProductFull[];
    isLoading: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface INewProductsInputProps {

}

export type NewProductsProps = INewProductsInputProps & INewProductsProps;