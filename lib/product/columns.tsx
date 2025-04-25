import { ITableFilters } from "@core/lib/useTableFilters";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IProduct } from "@store-shared/product/types";
import { Image } from "@store/components/Image";
import { Tag } from "antd";
import { ColumnType } from "antd/es/table";
import { prop, sort } from "ts-functional";
import { Index } from "ts-functional/dist/types";

const truncate = (id:string, maxLength:number = 4) => {
    if (id.length <= maxLength) return id;
    return `...${id.slice(-maxLength)}`;
}

export const productTableColumns = (filters:ITableFilters<IProduct>):Index<ColumnType<IProduct>> => {
    return {
        id: {
            title: "Id",
            dataIndex: "id",
            key: "id",
            sorter: (a, b) => `${a.id}`.padStart(10, "0").localeCompare(`${b.id}`.padStart(10, "0")),
            defaultSortOrder: "descend",
            render: (id:string) => <span>{truncate(id)}</span>,
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
            render: (enabled:boolean) => <div style={{textAlign: "center"}}>
                {enabled && <FontAwesomeIcon icon={faCheck} style={{color: "green"}} />}
                {!enabled && <FontAwesomeIcon icon={faClose} style={{color: "red"}} />}
            </div>,
        },
        subscription: {
            title: "Subscription Only",
            dataIndex: "subscriptionOnly",
            key: "subscriptionOnly",
            render: (enabled:boolean) => <div style={{textAlign: "center"}}>
                {enabled && <FontAwesomeIcon icon={faCheck} style={{color: "green"}} />}
                {!enabled && <FontAwesomeIcon icon={faClose} style={{color: "red"}} />}
            </div>,
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