import { DeleteBtn } from "@core/components/DeleteBtn";
import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";
import { useLoader } from "@core/lib/useLoader";
import { appendTo } from "@core/lib/util";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IProduct } from "@store-shared/product/types";
import { Switch } from "antd";
import { ColumnType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { all, prop, sort } from "ts-functional";
import { createInjector, inject, mergeProps } from "unstateless";
import { Image } from "../Image";
import { ProductManagerComponent } from "./ProductManager.component";
import { IProductManagerInputProps, IProductManagerProps, ProductManagerProps } from "./ProductManager.d";

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

    const remove = (id:number) => () => {
        const oldProducts = products;
        setProducts(products.filter(p => p.id !== id));
        loader.start();
        product.remove(id)
            .catch(all(() => setProducts(oldProducts), flash.error("Failed to remove product")))
            .finally(loader.stop);
    }

    useEffect(refresh, []);

    const columns:ColumnType<IProduct>[] = [{
        title: "ID",
        dataIndex: "id",
        key: "id",
        sorter: sort.by(prop<IProduct, "id">("id")).asc,
    },{
        title: "Thumbnail",
        key: "thumbnail",
        render: (product:IProduct) => <Image productId={product.id} imageId={product.thumbnailId} />,
        width: 64,
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
    }, {
        title: "Actions",
        key: "actions",
        render: (product:IProduct) => <>
            <Link to={`/products/${product.id}`}><FontAwesomeIcon icon={faEdit} /> Edit</Link>
            <DeleteBtn entityType="product" onClick={remove(product.id)} />
        </>,
    }]

    return {products, isLoading: loader.isLoading, create, remove, columns};
});

const connect = inject<IProductManagerInputProps, ProductManagerProps>(mergeProps(
    injectProductManagerProps,
));

export const ProductManager = connect(ProductManagerComponent);
