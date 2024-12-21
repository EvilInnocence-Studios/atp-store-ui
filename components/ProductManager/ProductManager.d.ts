export declare interface IProductManagerProps {
    products: IProduct[];
    isLoading: boolean;
    create: () => void;
    remove: (id: number) => () => void;
    columns: ColumnType<IProduct>[];
}

// What gets passed into the component from the parent as attributes
export declare interface IProductManagerInputProps {

}

export type ProductManagerProps = IProductManagerInputProps & IProductManagerProps;