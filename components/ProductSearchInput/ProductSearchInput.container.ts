import { createInjector, inject, mergeProps } from "unstateless";
import {ProductSearchInputComponent} from "./ProductSearchInput.component";
import {IProductSearchInputInputProps, ProductSearchInputProps, IProductSearchInputProps} from "./ProductSearchInput.d";
import { useSearch } from "@store/lib/useSearch";
import { useEffect, useState } from "react";

const injectProductSearchInputProps = createInjector(({}:IProductSearchInputInputProps):IProductSearchInputProps => {
    const {q, search} = useSearch();
    const [query, setQuery] = useState(q);

    useEffect(() => {
        setQuery(q);
    }, [q]);

    const runSearch = () => {
        search(query || "", true);
    }

    return {query, setQuery, runSearch};
});

const connect = inject<IProductSearchInputInputProps, ProductSearchInputProps>(mergeProps(
    injectProductSearchInputProps,
));

export const ProductSearchInput = connect(ProductSearchInputComponent);
