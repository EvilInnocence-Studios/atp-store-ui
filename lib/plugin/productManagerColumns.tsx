import { faCheck, faClose, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IProduct } from "@store-shared/product/types";
import { Image } from "@store/components/Image";
import { prop, sort } from "ts-functional";
import { storePlugins } from "./slots";
import { Tag } from "antd";
import { Link } from "react-router";
import { DeleteBtn } from "@core/components/DeleteBtn";

const truncate = (id:string, maxLength:number = 4) => {
    if (id.length <= maxLength) return id;
    return `...${id.slice(-maxLength)}`;
}

const regColumn = storePlugins.product.manager.columns.registerColumn;
const regColumnSet = storePlugins.product.manager.columns.registerColumnSet;

export const registerProductManagerColumnPlugins = () => {
    regColumn({
        key: "id",
        column: () => ({
            title: "Id",
            dataIndex: "id",
            key: "id",
            sorter: (a, b) => `${a.id}`.padStart(10, "0").localeCompare(`${b.id}`.padStart(10, "0")),
            defaultSortOrder: "descend",
            render: (id:string) => <span>{truncate(id)}</span>,
        }),
    });
    regColumn({
        key: "thumbnail",
        column: () => ({
            title: "Thumbnail",
            key: "thumbnail",
            render: (product:IProduct) => <Image productId={product.id} imageId={product.thumbnailId} />,
            width: 64,
        }),
    });
    regColumn({
        key: "name",
        column: ({filters}) => ({
            title: filters.filter("Name", "name"),
            dataIndex: 'name',
            key: 'name',
            sorter: sort.by(prop<IProduct, "name">("name")).asc,
        }),
    });
    regColumn({
        key: "sku",
        column: ({filters}) => ({
            title: filters.filter("SKU", "sku"),
            dataIndex: 'sku',
            key: 'sku',
            sorter: sort.by(prop<IProduct, "sku">("sku")).asc,
        }),
    });
    regColumn({
        key: "price",
        column: () => ({
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: sort.by(prop<IProduct, "price">("price")).asc,
        }),
    });
    regColumn({
        key: "url",
        column: ({filters}) => ({
            title: filters.filter("URL", "url"),
            dataIndex: "url",
            key: "url",
            sorter: sort.by(prop<IProduct, "url">("url")).asc,
        }),
    });
    regColumn({
        key: "type",
        column: ({filters}) => ({
            title: filters.select("Type", "productType", ["grouped", "digital"]),
            dataIndex: "productType",
            key: "productType",
            sorter: sort.by(prop<IProduct, "productType">("productType")).asc,
        }),
    });
    regColumn({
        key: "enabled",
        column: () => ({
            title: "Enabled",
            dataIndex: "enabled",
            key: "enabled",
            render: (enabled:boolean) => <div style={{textAlign: "center"}}>
                {enabled && <FontAwesomeIcon icon={faCheck} style={{color: "green"}} />}
                {!enabled && <FontAwesomeIcon icon={faClose} style={{color: "red"}} />}
            </div>,
        }),
    });
    regColumn({
        key: "releaseDate",
        column: () => ({
            title: "Release Date",
            dataIndex: "releaseDate",
            key: "releaseDate",
            render: (releaseDate:string) => new Date(releaseDate).toLocaleDateString(),
            sorter: sort.by(prop<IProduct, "releaseDate">("releaseDate")).asc,
        }),
    });
    regColumn({
        key: "tags",
        column: () => ({
            title: "Tags",
            dataIndex: "tags",
            key: "tags",
            render: (tags:string[]) => <>
                {tags.map(tag => <Tag>{tag}</Tag>)}
            </>
        }),
    });
    regColumn({
        key: "actions",
        column: ({remove}) => ({
            title: "Actions",
            key: "actions",
            render: (product:IProduct) => <>
                <Link to={`/products/${product.id}`} onClick={(e) => {e.stopPropagation();}}><FontAwesomeIcon icon={faEdit} /> Edit</Link>
                <DeleteBtn entityType="product" onClick={remove(product.id)} />
            </>,
        }),
    });

    regColumnSet("Info", [
        {priority: 1000, key: "id"},
        {priority: 900, key: "thumbnail"},
        {priority: 800, key: "name"},
        {priority: 700, key: "sku"},
        {priority: 600, key: "url"},
        {priority: 500, key: "type"},
        {priority: 400, key: "enabled"},
        {priority: 200, key: "actions"},
    ]);
    regColumnSet("Details", [
        {priority: 1000, key: "id"},
        {priority: 900, key: "thumbnail"},
        {priority: 800, key: "name"},
        {priority: 700, key: "price"},
        {priority: 600, key: "releaseDate"},
        {priority: 300, key: "actions"},
    ]);
    regColumnSet("Tags", [
        {priority: 1000, key: "id"},
        {priority: 900, key: "thumbnail"},
        {priority: 800, key: "name"},
        {priority: 700, key: "tags"},
        {priority: 600, key: "actions"},
    ]);
}