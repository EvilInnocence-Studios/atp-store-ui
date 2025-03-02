import { IProduct } from "@store-shared/product/types";

export declare interface IQueueProps {
    product: IProduct;
    refresh: () => void;
    next?: () => void;
    prev?: () => void;
    tagName: string;
    productCount: number;
}

// What gets passed into the component from the parent as attributes
export declare interface IQueueInputProps {
    tagName: string;
}

export type QueueProps = IQueueInputProps & IQueueProps;