import { DeleteBtn } from "@core/components/DeleteBtn";
import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";
import { useLoader } from "@core/lib/useLoader";
import { useTableFilters } from "@core/lib/useTableFilters";
import { appendTo } from "@core/lib/util";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IProduct } from "@store-shared/product/types";
import { Switch, Tag } from "antd";
import { ColumnType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { all, prop, sort } from "ts-functional";
import { Index } from "ts-functional/dist/types";
import { createInjector, inject, mergeProps } from "unstateless";
import { Image } from "../Image";
import { ProductManagerComponent } from "./ProductManager.component";
import { IProductManagerInputProps, IProductManagerProps, ProductManagerProps } from "./ProductManager.d";

const injectProductManagerProps = createInjector(({}:IProductManagerInputProps):IProductManagerProps => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [tab, setTab] = useState("Info");
    const loader =  useLoader();

    const product = services().product;

    const create = () => {
        loader.start();
        product.create({name: 'New Product', description: 'New Description'})
            .then(appendTo(products))
            .then(refresh)
            .catch(flash.error("Failed to create product"))
            .finally(loader.stop);
    }
    
    const refresh = () => {
        loader.start();
        product.search()
            .then(setProducts)
            .catch(flash.error("Failed to load products"))
            .finally(loader.stop);
    }

    const remove = (id:string) => () => {
        const oldProducts = products;
        setProducts(products.filter(p => p.id !== id));
        loader.start();
        product.remove(id)
            .catch(all(() => setProducts(oldProducts), flash.error("Failed to remove product")))
            .finally(loader.stop);
    }

    useEffect(refresh, []);

    const filters = useTableFilters(products);
    const columnIndex:Index<ColumnType<IProduct>> = {
        id: {
            title: "Id",
            dataIndex: "id",
            key: "id",
            sorter: (a, b) => `${a.id}`.padStart(10, "0").localeCompare(`${b.id}`.padStart(10, "0")),
        },
        thumbnail: {
            title: "Thumbnail",
            key: "thumbnail",
            render: (product:IProduct) => <Image productId={product.id} imageId={product.thumbnailId} />,
            width: 64,
        },
        name: {
            title: filters.filter("Name", "name"),
            dataIndex: 'name',
            key: 'name',
            sorter: sort.by(prop<IProduct, "name">("name")).asc,
        },
        sku: {
            title: filters.filter("SKU", "sku"),
            dataIndex: 'sku',
            key: 'sku',
            sorter: sort.by(prop<IProduct, "sku">("sku")).asc,
        },
        price: {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: sort.by(prop<IProduct, "price">("price")).asc,
        },
        url: {
            title: filters.filter("URL", "url"),
            dataIndex: "url",
            key: "url",
            sorter: sort.by(prop<IProduct, "url">("url")).asc,
        },
        type: {
            title: filters.select("Type", "productType", ["grouped", "digital"]),
            dataIndex: "productType",
            key: "productType",
            sorter: sort.by(prop<IProduct, "productType">("productType")).asc,
        },
        enabled: {
            title: "Enabled",
            dataIndex: "enabled",
            key: "enabled",
            render: (enabled:boolean) => <Switch checked={enabled} checkedChildren="Enabled" unCheckedChildren="Disabled" />,
        },
        subscription: {
            title: "Subscription Only",
            dataIndex: "subscriptionOnly",
            key: "subscriptionOnly",
            render: (enabled:boolean) => <Switch checked={enabled} checkedChildren="BSP" unCheckedChildren="Regular" />,
        },
        releaseDate: {
            title: "Release Date",
            dataIndex: "releaseDate",
            key: "releaseDate",
            render: (releaseDate:string) => new Date(releaseDate).toLocaleDateString(),
            sorter: sort.by(prop<IProduct, "releaseDate">("releaseDate")).asc,
        },
        brokeredAt: {
            title: filters.select("Brokered At", "brokeredAt", ["Daz", "HiveWire", "Renderosity", "RuntimeDNA"]),
            dataIndex: "brokeredAt",
            key: "brokeredAt",
        },
        brokerageId: {
            title: "Brokerage Product ID",
            dataIndex: "brokerageProductId",
            key: "brokerageProductId",
        },
        tags: {
            title: "Tags",
            dataIndex: "tags",
            key: "tags",
            render: (tags:string[]) => <>
                {tags.map(tag => <Tag>{tag}</Tag>)}
            </>
        },
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
        Info: ["id", "thumbnail", "name", "sku", "url", "type", "enabled", "subscription", "actions"],
        Details: ["id", "thumbnail", "name", "price", "releaseDate", "brokeredAt", "brokerageId", "actions"],
        Tags: ["id", "thumbnail", "name", "tags"],
    }

    const columns = columnSets[tab].map(key => columnIndex[key]);

    return {products:filters.items, isLoading: loader.isLoading, create, remove, columns, tab, setTab, allTabs: Object.keys(columnSets), filters: filters.values};
});

const connect = inject<IProductManagerInputProps, ProductManagerProps>(mergeProps(
    injectProductManagerProps,
));

export const ProductManager = connect(ProductManagerComponent);
