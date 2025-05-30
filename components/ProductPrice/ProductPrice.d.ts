import { IProduct } from "@store-shared/product/types";

export declare interface IProductPriceProps {
    salePrice: number;
    isLoading: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface IProductPriceInputProps {
    product: IProduct;
    small?: boolean;
}

export type ProductPriceProps = IProductPriceInputProps & IProductPriceProps;