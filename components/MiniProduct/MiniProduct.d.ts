import { IProduct } from "@store-shared/product/types";

export declare interface IMiniProductProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IMiniProductInputProps {
    product: IProduct;
}

export type MiniProductProps = IMiniProductInputProps & IMiniProductProps;