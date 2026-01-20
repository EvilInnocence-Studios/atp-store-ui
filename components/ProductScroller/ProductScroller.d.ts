import { IProductFull } from "@store-shared/product/types";

export declare interface IProductScrollerProps {
    products: IProductFull[];
    isLoading: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface IProductScrollerInputProps {
    filter?: (product: IProductFull) => boolean;
    sort?: (a: IProductFull, b: IProductFull) => number;
    classes?: any;
    count?: number;
    title: string;
    hideCartButton?: boolean;
    className?: string;
    css?: string;
}

export type ProductScrollerProps = IProductScrollerInputProps & IProductScrollerProps;