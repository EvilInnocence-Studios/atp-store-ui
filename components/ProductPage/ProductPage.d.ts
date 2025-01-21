import { IProductFull } from "@store-shared/product/types";

export declare interface IProductPageProps {
    product: IProductFull | null;
    relatedProducts: IProduct[];
    media: IProductMedia[];
    isLoading: boolean;
    subProducts: IProduct[];
}

// What gets passed into the component from the parent as attributes
export declare interface IProductPageInputProps {
    url: string;
}

export type ProductPageProps = IProductPageInputProps & IProductPageProps;