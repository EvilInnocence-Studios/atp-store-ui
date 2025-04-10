import { DeleteBtn } from "@core/components/DeleteBtn";
import { useTableFilters } from "@core/lib/useTableFilters";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IProduct } from "@store-shared/product/types";
import { productTableColumns } from "@store/lib/product/columns";
import { useProductList } from "@store/lib/useProductList";
import { ColumnType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Index } from "ts-functional/dist/types";
import { createInjector, inject, mergeProps } from "unstateless";
import { ProductManagerComponent } from "./ProductManager.component";
import { IProductManagerInputProps, IProductManagerProps, ProductManagerProps } from "./ProductManager.d";

const injectProductManagerProps = createInjector(({}:IProductManagerInputProps):IProductManagerProps => {
    const {products, create, remove, refresh, isLoading} = useProductList();
    const [tab, setTab] = useState("Info");
    const navigate = useNavigate();

    useEffect(refresh, []);

    const goToProduct = (product:IProduct) => {
        navigate(`/products/${product.id}`);
    }

    const filters = useTableFilters(products);
    const columnIndex:Index<ColumnType<IProduct>> = {
        ...productTableColumns(filters),
        actions: {
            title: "Actions",
            key: "actions",
            render: (product:IProduct) => <>
                <Link to={`/products/${product.id}`}><FontAwesomeIcon icon={faEdit} /> Edit</Link>
                <DeleteBtn entityType="product" onClick={remove(product.id)} />
            </>,
        }
    };

    const columnSets:Index<string[]> = {
        Info:    ["id", "thumbnail", "name", "sku",   "url",         "type",       "enabled",     "subscription", "actions"],
        Details: ["id", "thumbnail", "name", "price", "releaseDate", "brokeredAt", "brokerageId", "actions"                ],
        Tags:    ["id", "thumbnail", "name", "tags",  "actions"                                                            ],
    }

    const columns = columnSets[tab].map(key => columnIndex[key]);

    return {
        products:filters.items, isLoading,
        create: () => (create(goToProduct)), remove,
        columns,
        tab, setTab, allTabs: Object.keys(columnSets),
        filters: filters.values,
    };
});

const connect = inject<IProductManagerInputProps, ProductManagerProps>(mergeProps(
    injectProductManagerProps,
));

export const ProductManager = connect(ProductManagerComponent);
