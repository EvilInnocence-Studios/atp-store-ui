import { IProduct, IProductMedia } from "@store-shared/product/types";

export declare interface IProductMediaEditorProps {
    media: IProductMedia[];
    upload: (file: File) => void;
    isLoading: boolean;
    updateThumbnail: (id: string) => void;
    updateMainImage: (id: string) => void;
}

export declare interface IProductMediaEditorProps {
    media: IProductMedia[];
    upload: (file: File) => void;
    isLoading: boolean;
    updateThumbnail: (id: string) => void;
    updateMainImage: (id: string) => void;
    remove: (id: string) => () => void;
    sort: (id: string, newIndex: number) => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IProductMediaEditorInputProps {
    product: IProduct;
    update: (field: keyof IProduct) => (value: string) => void;
    classes?: any;
}

export type ProductMediaEditorProps = IProductMediaEditorInputProps & IProductMediaEditorProps;