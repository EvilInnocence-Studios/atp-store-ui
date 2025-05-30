import { IProductFull } from "@store-shared/product/types";
import {Setter} from 'unstateless';

export declare interface IProductSearchProps {
    products: IProductFull[];
    search: string;
    setSearch: Setter<string>;
    isLoading: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface IProductSearchInputProps {
    onSelect: (productId:string) => void;
    placeholder?: string;
}

export type ProductSearchProps = IProductSearchInputProps & IProductSearchProps;