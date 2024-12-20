import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";
import { useLoader } from "@core/lib/useLoader";
import { appendTo } from "@core/lib/util";
import { IProduct } from "@store-shared/product/types";
import { ColumnType } from "antd/es/table";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { ProductManagerComponent } from "./ProductManager.component";
import { IProductManagerInputProps, IProductManagerProps, ProductManagerProps } from "./ProductManager.d";
import { Switch } from "antd";
import { prop, sort } from "ts-functional";

const injectProductManagerProps = createInjector(({}:IProductManagerInputProps):IProductManagerProps => {
    const [products, setProducts] = useState<IProduct[]>([]);
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

    useEffect(refresh, []);

    const imgHost = "https://www.evilinnocence.com/shop/media/catalog/product/cache/1/small_image/256x/9df78eab33525d08d6e5fb8d27136e95/";
    const columns:ColumnType<IProduct>[] = [{
        title: "ID",
        dataIndex: "id",
        key: "id",
        sorter: sort.by(prop<IProduct, "id">("id")).asc,
    },{
        title: "Thumbnail",
        dataIndex: "thumbnail",
        key: "thumbnail",
        render: (thumbnail:string) => <img width={64} src={`${imgHost}${thumbnail}`} />
    },{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: sort.by(prop<IProduct, "name">("name")).asc,
    },{
        title: 'SKU',
        dataIndex: 'sku',
        key: 'sku',
        sorter: sort.by(prop<IProduct, "sku">("sku")).asc,
    },{
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        sorter: sort.by(prop<IProduct, "price">("price")).asc,
    },{
        title: "URL",
        dataIndex: "url",
        key: "url",
        sorter: sort.by(prop<IProduct, "url">("url")).asc,
    },{
        title: "Type",
        dataIndex: "productType",
        key: "productType",
        sorter: sort.by(prop<IProduct, "productType">("productType")).asc,
    },{
        title: "Enabled",
        dataIndex: "enabled",
        key: "enabled",
        render: (enabled:boolean) => <Switch checked={enabled} checkedChildren="Yes" unCheckedChildren="No" />,
    },{
        title: "Subscription Only",
        dataIndex: "subscriptionOnly",
        key: "subscriptionOnly",
    },{
        title: "Release Date",
        dataIndex: "releaseDate",
        key: "releaseDate",
        render: (releaseDate:string) => new Date(releaseDate).toLocaleDateString(),
        sorter: sort.by(prop<IProduct, "releaseDate">("releaseDate")).asc,
    },{
        title: "Brokered At",
        dataIndex: "brokeredAt",
        key: "brokeredAt",
        },{
        title: "Brokerage Product ID",
        dataIndex: "brokerageProductId",
        key: "brokerageProductId",
    }]

    return {products, isLoading: loader.isLoading, create, columns};
});

const connect = inject<IProductManagerInputProps, ProductManagerProps>(mergeProps(
    injectProductManagerProps,
));

export const ProductManager = connect(ProductManagerComponent);
