import { IProduct } from "@store-shared/product/types";

export declare interface IProductPriceProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IProductPriceInputProps {
    product: IProduct;
}

export type ProductPriceProps = IProductPriceInputProps & IProductPriceProps;