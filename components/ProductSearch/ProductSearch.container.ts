import { useSynonyms } from "@common/lib/synonym/util";
import { services } from "@core/lib/api";
import { useLoader } from "@core/lib/useLoader";
import { IProductFull } from "@store-shared/product/types";
import { searchMatch, searchString } from "@store/lib/search";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { ProductSearchComponent } from "./ProductSearch.component";
import { IProductSearchInputProps, IProductSearchProps, ProductSearchProps } from "./ProductSearch.d";

const injectProductSearchProps = createInjector(({}:IProductSearchInputProps):IProductSearchProps => {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState<IProductFull[]>([]);
    const synonyms = useSynonyms();
    const loader = useLoader();

    useEffect(() => {
        loader.start();
        services().product.search()
            .then(setProducts)
            .finally(loader.stop);
    }, []);

    const match = (p:IProductFull) => searchMatch(search, searchString(p, synonyms));

    const matchingProducts = products
        .filter(p => match(p) >= search.split(" ").length)
        .sort((a, b) => match(b) - match(a));
    
    return {products: matchingProducts, search, setSearch: debounce(setSearch, 500)};
});

const connect = inject<IProductSearchInputProps, ProductSearchProps>(mergeProps(
    injectProductSearchProps,
));

export const ProductSearch = connect(ProductSearchComponent);
