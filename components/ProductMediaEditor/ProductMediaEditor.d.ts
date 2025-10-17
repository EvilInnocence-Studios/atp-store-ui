import { IProduct, IProductMedia } from "@store-shared/product/types";

export declare interface IProductMediaEditorProps {
    media: IProductMedia[];
    upload: (file: File) => void;
    isLoading: boolean;
    updateThumbnail: (id:string) => void;
    updateMainImage: (id:string) => void;
    remove: (id:string) => () => void;
    move: (id:string, direction:"up" | "down") => () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IProductMediaEditorInputProps {
    product: IProduct;
    update: (field:keyof IProduct) => (value:string) => void;
}

export type ProductMediaEditorProps = IProductMediaEditorInputProps & IProductMediaEditorProps;