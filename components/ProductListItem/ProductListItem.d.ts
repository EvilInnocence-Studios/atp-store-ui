import { IProduct } from "@store-shared/product/types";

export declare interface IProductListItemProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IProductListItemInputProps {
    product: IProduct;
}

export type ProductListItemProps = IProductListItemInputProps & IProductListItemProps;