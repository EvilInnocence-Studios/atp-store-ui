import { IProduct } from "@store-shared/product/types";

export declare interface IQueueProps {
    product: IProduct;
    refresh: () => void;
    done: () => void;
    next?: () => void;
    prev?: () => void;
    tag: ITag | null;
    productCount: number;
}

// What gets passed into the component from the parent as attributes
export declare interface IQueueInputProps {
    groupId: string;
    tagId: string;
}

export type QueueProps = IQueueInputProps & IQueueProps;