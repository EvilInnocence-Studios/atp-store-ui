import { Setter } from "unstateless";

export declare interface IProductManagerProps {
    products: IProduct[];
    isLoading: boolean;
    create: () => void;
    remove: (id:string) => () => void;
    columns: ColumnType<IProduct>[];
    tab: string;
    setTab: Setter<string>;
    allTabs: string[];
    filters: Record<keyof IProduct, string>;
    goToProduct: (product:IProduct) => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IProductManagerInputProps {

}

export type ProductManagerProps = IProductManagerInputProps & IProductManagerProps;