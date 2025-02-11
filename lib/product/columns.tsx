import { ITableFilters } from "@core/lib/useTableFilters";
import { IProduct } from "@store-shared/product/types";
import { Image } from "@store/components/Image";
import { Switch, Tag } from "antd";
import { ColumnType } from "antd/es/table";
import { prop, sort } from "ts-functional";
import { Index } from "ts-functional/dist/types";

export const productTableColumns = (filters:ITableFilters<IProduct>):Index<ColumnType<IProduct>> => {
    return {
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
    };
}