import { IProduct, IProductMedia } from "@store-shared/product/types";

export declare interface IProductMediaEditorProps {
    media: IProductMedia[];
    upload: (file: File) => void;
    isLoading: boolean;
    updateThumbnail: (id:number) => void;
    updateMainImage: (id:number) => void;
    remove: (id:number) => () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IProductMediaEditorInputProps {
    product: IProduct;
    update: (field:string) => (value:number) => void;
}

export type ProductMediaEditorProps = IProductMediaEditorInputProps & IProductMediaEditorProps;