import { IProductFile } from "@store-shared/product/types";
import { Setter } from "unstateless";

export declare interface IUserFileListProps {
    user: SafeUser;
    files: IProductFile[];
    isLoading: boolean;
    q: string;
    setQ: Setter<string>;
}

// What gets passed into the component from the parent as attributes
export declare interface IUserFileListInputProps {
    userId?: string;
    classes?: any;
}

export type UserFileListProps = IUserFileListInputProps & IUserFileListProps;