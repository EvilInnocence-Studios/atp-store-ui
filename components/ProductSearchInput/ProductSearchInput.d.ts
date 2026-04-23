export declare interface IProductSearchInputProps {
    query?: string;
    setQuery: Setter<string | undefined>;
    runSearch: () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IProductSearchInputInputProps {
    className?: string;
    css?: string;
}

export type ProductSearchInputProps = IProductSearchInputInputProps & IProductSearchInputProps;