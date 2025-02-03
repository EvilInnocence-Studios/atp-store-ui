import { IProduct } from "@store-shared/product/types";

export declare interface ISubProductsEditorProps {
    subProducts: IProduct[];
    isLoading: boolean;
    add: (subProductId:string) => void;
    remove: (subProductId:string) => void;
}

// What gets passed into the component from the parent as attributes
export declare interface ISubProductsEditorInputProps {
    productId:string;
}

export type SubProductsEditorProps = ISubProductsEditorInputProps & ISubProductsEditorProps;