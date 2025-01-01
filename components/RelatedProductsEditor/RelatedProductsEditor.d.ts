import { IProduct } from "@store-shared/product/types";

export declare interface IRelatedProductsEditorProps {
    related: IProduct[];
    add: (productId:number) => void;
    remove: (product:IProduct) => () => void;
    isLoading: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface IRelatedProductsEditorInputProps {
    productId: number;
}

export type RelatedProductsEditorProps = IRelatedProductsEditorInputProps & IRelatedProductsEditorProps;