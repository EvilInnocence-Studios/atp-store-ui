import { useTagGroups } from "@common/lib/useTagGroups";
import { useLoader } from "@core/lib/useLoader";
import { usePaginator } from "@core/lib/usePaginator";
import { useToggle } from "@core/lib/useToggle";
import { useProductList } from "@store/lib/useProductList";
import { useSearch } from "@store/lib/useSearch";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { ProductsPageComponent } from "./ProductsPage.component";
import { IProductsPageInputProps, IProductsPageProps, ProductsPageProps } from "./ProductsPage.d";
import { synonymReplace, useSynonyms } from "@common/lib/synonym/util";
import { useSetting } from "@common/lib/setting/services";

const injectProductsPageProps = createInjector(({}:IProductsPageInputProps):IProductsPageProps => {
    const {products, isLoading} = useProductList();
    const synonyms = useSynonyms();
    const [filteredProducts, setFilteredProducts] = useState(products);
    const {groups} = useTagGroups();
    const filters = useToggle();
    const {q, selectedTagIds, ...handlers} = useSearch();
    const paginator = usePaginator(handlers.page, handlers.perPage, handlers.updateQuery);
    const showFilterBar = useSetting("store.showFilterBar") === "true";

    // Calculate column count from screen width and settings
    // since we can't use CSS variables in media queries
    const fiveColumnMinWidth  = useSetting("store.fiveColumnMinWidth" );
    const fourColumnMinWidth  = useSetting("store.fourColumnMinWidth" );
    const threeColumnMinWidth = useSetting("store.threeColumnMinWidth");
    const twoColumnMinWidth   = useSetting("store.twoColumnMinWidth"  );
    const columns =
        window.innerWidth >= Number(fiveColumnMinWidth)  ? "Five"  :
        window.innerWidth >= Number(fourColumnMinWidth)  ? "Four"  :
        window.innerWidth >= Number(threeColumnMinWidth) ? "Three" :
        window.innerWidth >= Number(twoColumnMinWidth)   ? "Two"   :
                                                           "One"   ;

    const loader = useLoader();

    const selectedFiltersByGroup = groups
        .map(({tags}) => tags.filter(tag => selectedTagIds.includes(tag.id.toString())))
        .filter(tags => tags.length > 0);

    const updateFilteredProducts = async () => {
        loader.start();
        await new Promise((resolve) => {
            // Filter products based on selected tags
            // A product only needs to match one tag for a given tag group,
            // but needs to match at least one tag in each tag group
            // product.tags is a list of the tag names associated with the product
            setFilteredProducts((selectedFiltersByGroup.length === 0 && !q ? products.filter(p => p.enabled) : products
                .filter(p => p.enabled)
                .filter(product =>
                    selectedFiltersByGroup.every(tags => tags.some(tag => (product.tags as string[]).includes(tag.name)))
                )
                .filter(product => !q || new RegExp(`\\b${synonymReplace(q, synonyms)}\\b`).test(product.search))
            ));
            resolve(null);
        }).then(loader.stop);
    }

    useEffect(() => {updateFilteredProducts();}, [selectedTagIds.toString(), q, products]);

    return {
        selectedTagIds, q,
        products:filteredProducts,
        isLoading: isLoading || loader.isLoading,
        paginator, filters,
        showFilterBar,
        columns,
        ...handlers,
    };
});

const connect = inject<IProductsPageInputProps, ProductsPageProps>(mergeProps(
    injectProductsPageProps,
));

export const ProductsPage = connect(ProductsPageComponent);
