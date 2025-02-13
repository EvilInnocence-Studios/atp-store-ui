import { useTagGroups } from "@common/lib/useTagGroups";
import { useLoader } from "@core/lib/useLoader";
import { usePaginator } from "@core/lib/usePaginator";
import { useToggle } from "@core/lib/useToggle";
import { useProducts } from "@store/lib/product/services";
import { useSearch } from "@store/lib/useSearch";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { ProductsPageComponent } from "./ProductsPage.component";
import { IProductsPageInputProps, IProductsPageProps, ProductsPageProps } from "./ProductsPage.d";

const injectProductsPageProps = createInjector(({}:IProductsPageInputProps):IProductsPageProps => {
    const {products, isLoading} = useProducts();
    const [filteredProducts, setFilteredProducts] = useState(products);
    const {groups} = useTagGroups();
    const filters = useToggle();
    const {q, selectedTagIds, ...handlers} = useSearch();
    const paginator = usePaginator(handlers.page, handlers.perPage, handlers.updateQuery);

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
                .filter(product => !q ||
                    product.name.toLowerCase().includes(q.toLowerCase()) ||
                    product.description.toLowerCase().includes(q.toLowerCase())
                )
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
        ...handlers,
    };
});

const connect = inject<IProductsPageInputProps, ProductsPageProps>(mergeProps(
    injectProductsPageProps,
));

export const ProductsPage = connect(ProductsPageComponent);
