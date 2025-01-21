import { IProduct } from "@store-shared/product/types";

export declare interface ISubProductsEditorProps {
    subProducts: IProduct[];
    isLoading: boolean;
    add: (subProductId: number) => void;
    remove: (subProductId: number) => void;
}

// What gets passed into the component from the parent as attributes
export declare interface ISubProductsEditorInputProps {
    productId: number;
}

export type SubProductsEditorProps = ISubProductsEditorInputProps & ISubProductsEditorProps;