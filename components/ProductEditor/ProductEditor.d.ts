import { IProduct } from "@store-shared/product/types";

export declare interface IProductEditorProps {
    product?: IProduct;
    isLoading: boolean;
    updateString: (field: keyof IProduct) => (value?: string) => void;
    updateToggle: (field: keyof IProduct) => (value?:boolean) => void;
    updateNumber: (field: keyof IProduct) => (value?:number) => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IProductEditorInputProps {
    productId: number;
}

export type ProductEditorProps = IProductEditorInputProps & IProductEditorProps;