import { IProductFull } from "@store-shared/product/types";

export declare interface IProductScrollerProps {
    products: IProductFull[];
    isLoading: boolean;
    scroll: IScrollable;
}

// What gets passed into the component from the parent as attributes
export declare interface IProductScrollerInputProps {
    filter: (p:IProductFull) => boolean;
    sort: (a:IProductFull, b:IProductFull) => number;
    count?: number;
}

export type ProductScrollerProps = IProductScrollerInputProps & IProductScrollerProps;