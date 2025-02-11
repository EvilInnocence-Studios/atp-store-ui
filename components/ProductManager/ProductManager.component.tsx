import { faPlus, faShop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IProduct } from "@store-shared/product/types";
import { Button, Spin, Table, Tabs, Tag } from "antd";
import { objMap, prop, sort } from "ts-functional";
import { ProductManagerProps } from "./ProductManager.d";
import styles from './ProductManager.module.scss';

export const ProductManagerComponent = ({products, isLoading, create, columns, tab, setTab, allTabs, filters}:ProductManagerProps) =>
    <div className={styles.productManager}>
        <h1>
            <FontAwesomeIcon icon={faShop} /> Products
        </h1>

        <p>Filters: {Object.values(objMap((value:string, key) => <Tag key={key}>{key}: {value}</Tag>)(filters))}</p>

        <Spin spinning={isLoading}>
            <Tabs
                defaultActiveKey={tab}
                onChange={setTab}
                items={allTabs.map(tab => ({key: tab, label: tab}))}
                tabBarExtraContent={<Button type="primary" onClick={create}><FontAwesomeIcon icon={faPlus} /> New Product</Button>}
            />
            <Table
                dataSource={products.sort(sort.by(prop<IProduct, "name">("name")).asc)}
                rowKey="id"
                columns={columns}
                size="small"
            />
        </Spin>
    </div>;
