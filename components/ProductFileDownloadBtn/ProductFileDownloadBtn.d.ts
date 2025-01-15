import { IProductFile } from "@store-shared/product/types";

export declare interface IProductFileDownloadBtnProps {
    download: () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IProductFileDownloadBtnInputProps {
    file: IProductFile;
}

export type ProductFileDownloadBtnProps = IProductFileDownloadBtnInputProps & IProductFileDownloadBtnProps;