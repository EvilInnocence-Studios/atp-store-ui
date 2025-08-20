export declare interface IProductSearchInputProps {
    query?: string;
    setQuery: Setter<string | undefined>;
    runSearch: () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IProductSearchInputInputProps {

}

export type ProductSearchInputProps = IProductSearchInputInputProps & IProductSearchInputProps;