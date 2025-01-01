import { useSynonyms } from "@common/lib/synonym/util";
import { services } from "@core/lib/api";
import { useLoader } from "@core/lib/useLoader";
import { IProductFull } from "@store-shared/product/types";
import { searchProduct } from "@store/lib/search";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { ProductSearchComponent } from "./ProductSearch.component";
import { IProductSearchInputProps, IProductSearchProps, ProductSearchProps } from "./ProductSearch.d";

const factor = 100000000000;
export const dateDiff = (p:IProductFull) => 10 * (Date.now() - Date.parse(p.releaseDate))/factor;

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

    const match = (p:IProductFull) => searchProduct(p, search, synonyms);

    const matchingProducts = !search ? products : products
        .filter(p => match(p) >= search.split(" ").length)
        .sort((a, b) => {
            // Make more recently released products sort higher
            const matcha = match(a) - dateDiff(a);
            const matchb = match(b) - dateDiff(b);
            const diff = matchb - matcha;

            return diff;
        });
    
    return {products: matchingProducts, search, setSearch: debounce(setSearch, 500), match};
});

const connect = inject<IProductSearchInputProps, ProductSearchProps>(mergeProps(
    injectProductSearchProps,
));

export const ProductSearch = connect(ProductSearchComponent);
