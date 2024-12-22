import { IProduct, IProductMedia } from "@store-shared/product/types";

export declare interface IProductMediaEditorProps {
    media: IProductMedia[];
    upload: (file: File) => void;
    isLoading: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface IProductMediaEditorInputProps {
    product: IProduct;
}

export type ProductMediaEditorProps = IProductMediaEditorInputProps & IProductMediaEditorProps;