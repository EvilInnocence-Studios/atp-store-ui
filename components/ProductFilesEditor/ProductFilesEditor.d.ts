import { IProductFile } from "@store-shared/product/types";
import { Setter } from "unstateless";

export declare interface IProductFilesEditorProps {
    files: IProductFile[];
    isLoading: boolean;
    add: (file: File) => void;
    remove: (fileId: string) => () => void;
    folder: string;
    setFolder: Setter<string>;
    download: (file: IProductFile) => () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IProductFilesEditorInputProps {
    productId: string;
    classes?: any;
}

export type ProductFilesEditorProps = IProductFilesEditorInputProps & IProductFilesEditorProps;