import { IProductFile } from "@store-shared/product/types";

export declare interface IUserFileListProps {
    user: SafeUser;
    files: IProductFile[];
    isLoading: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface IUserFileListInputProps {
    userId?: number;
}

export type UserFileListProps = IUserFileListInputProps & IUserFileListProps;