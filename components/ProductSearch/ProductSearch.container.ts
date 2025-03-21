import { synonymReplace, useSynonyms } from "@common/lib/synonym/util";
import { IProductFull } from "@store-shared/product/types";
import { useProductList } from "@store/lib/useProductList";
import { debounce } from "lodash";
import { useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { ProductSearchComponent } from "./ProductSearch.component";
import { IProductSearchInputProps, IProductSearchProps, ProductSearchProps } from "./ProductSearch.d";

export const dateDiff = (p:IProductFull) => Date.now() - Date.parse(p.releaseDate);

const injectProductSearchProps = createInjector(({}:IProductSearchInputProps):IProductSearchProps => {
    const [search, setSearch] = useState("");
    const{products, isLoading} = useProductList();
    const synonyms = useSynonyms();

    const matchingProducts = !search ? products : products
        .filter(product => !search || new RegExp(`\\b${synonymReplace(search, synonyms)}\\b`).test(product.search))
        .sort((a, b) => dateDiff(a) - dateDiff(b));
    
    return {products: matchingProducts, search, setSearch: debounce(setSearch, 500), isLoading};
});

const connect = inject<IProductSearchInputProps, ProductSearchProps>(mergeProps(
    injectProductSearchProps,
));

export const ProductSearch = connect(ProductSearchComponent);
