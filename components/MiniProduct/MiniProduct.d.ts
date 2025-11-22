import { IProduct } from "@store-shared/product/types";

export declare interface IMiniProductProps {
    isLoading: boolean;
    product?: IProduct;
}

export declare interface IMiniProductProps {
    isLoading: boolean;
    product?: IProduct;
}

// What gets passed into the component from the parent as attributes
export declare interface IMiniProductInputProps {
    product?: IProduct;
    productId?: string;
    onRemove?: (id: string) => void;
    classes?: any;
}

export type MiniProductProps = IMiniProductInputProps & IMiniProductProps;