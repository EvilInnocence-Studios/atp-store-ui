import { createInjector, inject, mergeProps } from "unstateless";
import {ProductsPageComponent} from "./ProductsPage.component";
import {IProductsPageInputProps, ProductsPageProps, IProductsPageProps} from "./ProductsPage.d";
import { useEffect, useState } from "react";
import { ITag, ITagGroup } from "@common-shared/tag/types";
import { services } from "@core/lib/api";
import { useProducts } from "@store/lib/product/services";
import { useLoader } from "@core/lib/useLoader";
import { usePaginator } from "@core/lib/usePaginator";

const injectProductsPageProps = createInjector(({}:IProductsPageInputProps):IProductsPageProps => {
    const [groups, setGroups] = useState<Array<{group: ITagGroup, tags: ITag[]}>>([]);
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
    const {products, isLoading} = useProducts();
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [sortBy, setSortBy] = useState('newest');
    const paginator = usePaginator();

    const loader = useLoader();

    const updateFilteredProducts = async () => {
        loader.start();
        await new Promise((resolve) => {
            // Filter products based on selected tags
            // A product only needs to match one tag for a given tag group,
            // but needs to match at least one tag in each tag group
            // product.tags is a list of the tag names associated with the product
            const selectedFiltersByGroup = groups
                .map(({tags}) => tags.filter(tag => selectedTagIds.includes(tag.id)))
                .filter(tags => tags.length > 0);
            setFilteredProducts((selectedFiltersByGroup.length === 0 ? products : products.filter(product =>
                selectedFiltersByGroup.every(tags => tags.some(tag => (product.tags as string[]).includes(tag.name)))
            )).filter(p => p.enabled));
            resolve(null);
        }).then(loader.stop);
    }

    useEffect(() => {updateFilteredProducts();}, [selectedTagIds, products]);

    const selectTag = (tagId: number) => {
        setSelectedTagIds([...selectedTagIds, tagId]);
    };

    const removeTag = (tagId: number) => {
        setSelectedTagIds(selectedTagIds.filter(id => id !== tagId));
    };

    const clearTags = () => {
        setSelectedTagIds([]);
    };

    useEffect(() => {
        Promise.all([
            services().tagGroup.search(),
            services().tagGroup.tag.getAll(),
        ]).then(([groups, tags]) => {
            setGroups(groups.map(group => ({
                group,
                tags: tags.filter(tag => tag.groupId === group.id),
            })));
        });
    }, []);

    return {
        groups, selectTag, removeTag, clearTags, selectedTagIds,
        products:filteredProducts,
        isLoading: isLoading || loader.isLoading,
        paginator, sortBy, setSortBy,
    };
});

const connect = inject<IProductsPageInputProps, ProductsPageProps>(mergeProps(
    injectProductsPageProps,
));

export const ProductsPage = connect(ProductsPageComponent);
