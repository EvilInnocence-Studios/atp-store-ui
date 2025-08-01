import { DeleteBtn } from "@core/components/DeleteBtn";
import { useTableFilters } from "@core/lib/useTableFilters";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IProduct } from "@store-shared/product/types";
import { productTableColumns } from "@store/lib/product/columns";
import { useProductList } from "@store/lib/useProductList";
import { ColumnType } from "antd/es/table";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Index } from "ts-functional/dist/types";
import { createInjector, inject, mergeProps } from "unstateless";
import { ProductManagerComponent } from "./ProductManager.component";
import { IProductManagerInputProps, IProductManagerProps, ProductManagerProps } from "./ProductManager.d";
import { storePlugins } from "@store/lib/plugin/slots";

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

export const ProductManager = connect(ProductManagerComponent);
