import { IProductFull } from "@store-shared/product/types";
import {Setter} from 'unstateless';

export declare interface IProductSearchProps {
    products: IProductFull[];
    search: string;
    setSearch: Setter<string>;
}

// What gets passed into the component from the parent as attributes
export declare interface IProductSearchInputProps {

}

export type ProductSearchProps = IProductSearchInputProps & IProductSearchProps;