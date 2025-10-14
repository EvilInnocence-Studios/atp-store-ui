import { IProduct } from "@store-shared/product/types";

export declare interface IProductThumbnailProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IProductThumbnailInputProps {
    product: IProduct;
}

export type ProductThumbnailProps = IProductThumbnailInputProps & IProductThumbnailProps;