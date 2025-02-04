import { useTagGroups } from "@common/lib/useTagGroups";
import { useLoader } from "@core/lib/useLoader";
import { usePaginator } from "@core/lib/usePaginator";
import { useProducts } from "@store/lib/product/services";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { createInjector, inject, mergeProps } from "unstateless";
import { ProductsPageComponent } from "./ProductsPage.component";
import { IProductsPageInputProps, IProductsPageProps, ProductsPageProps } from "./ProductsPage.d";

const injectProductsPageProps = createInjector(({}:IProductsPageInputProps):IProductsPageProps => {
    const [search, setSearch] = useSearchParams();
    const {products, isLoading} = useProducts();
    const [filteredProducts, setFilteredProducts] = useState(products);
    const paginator = usePaginator();
    const {groups} = useTagGroups();

    const {q, tags:selectedTagIdsRaw = "", sortBy = "newest"} = Object.fromEntries(search.entries()) as unknown as {q?: string, tags?: string, sortBy:string};
    const selectedTagIds:string[] = selectedTagIdsRaw ? selectedTagIdsRaw.split(',') : [];

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

    const selectTag = (tagId: string) => {
        const newSearch = {
            ...(q ? {q} : {}),
            tags: [...selectedTagIds, tagId].join(","),
        };
        setSearch(newSearch);
    };

    const removeTag = (tagId: string) => {
        const newTags = selectedTagIds.filter(id => id !== tagId);
        setSearch({
            ...(q ? {q} : {}),
            ...newTags.length > 0 ? {tags: newTags.join(",")} : {},
        });
    };

    const setSortBy = (sortBy: string) => {
        setSearch({
            ...(q ? {q} : {}),
            ...(selectedTagIds.length > 0 ? {tags: selectedTagIds.join(",")} : {}),
            sortBy,
        });
    }

    const clearAll = () => {
        setSearch({});
    };

    const clearSearch = () => {
        setSearch({tags: selectedTagIds.join(",")});
    };

    return {
        selectTag, removeTag, clearAll, clearSearch, selectedTagIds, q,
        products:filteredProducts,
        isLoading: isLoading || loader.isLoading,
        paginator, sortBy, setSortBy,
    };
});

const connect = inject<IProductsPageInputProps, ProductsPageProps>(mergeProps(
    injectProductsPageProps,
));

export const ProductsPage = connect(ProductsPageComponent);
