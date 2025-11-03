import { overridable } from "@core/lib/overridable";
import { useTableFilters } from "@core/lib/useTableFilters";
import { IProduct } from "@store-shared/product/types";
import { storePlugins } from "@store/lib/plugin/slots";
import { useProductList } from "@store/lib/useProductList";
import { useState } from "react";
import { useNavigate } from "react-router";
import { createInjector, inject, mergeProps } from "unstateless";
import { ProductManagerComponent } from "./ProductManager.component";
import { IProductManagerInputProps, IProductManagerProps, ProductManagerProps } from "./ProductManager.d";

const injectProductManagerProps = createInjector(({}:IProductManagerInputProps):IProductManagerProps => {
    const {products, create, remove, isLoading} = useProductList();
    const [tab, setTab] = useState("Info");
    const navigate = useNavigate();

    const goToProduct = (product:IProduct) => {
        navigate(`/products/${product.id}`, {});
    }

    const filters = useTableFilters(products);

    const columns = storePlugins.product.manager.columns.getColumnSet(tab, {filters, remove});

    return {
        products:filters.items, isLoading,
        create: () => (create(goToProduct)), remove,
        columns,
        tab, setTab, allTabs: storePlugins.product.manager.columns.sets(),
        filters: filters.values,
        goToProduct,
    };
});

const connect = inject<IProductManagerInputProps, ProductManagerProps>(mergeProps(
    injectProductManagerProps,
));

export const ProductManager = overridable<IProductManagerInputProps>(connect(ProductManagerComponent));
