import { faShop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IProduct } from "@store-shared/product/types";
import { Spin, Table } from "antd";
import { prop, sort } from "ts-functional";
import { ProductManagerProps } from "./ProductManager.d";
import styles from './ProductManager.module.scss';

export const ProductManagerComponent = ({products, isLoading, /*create,*/ columns }:ProductManagerProps) =>
    <div className={styles.productManager}>
        <h1><FontAwesomeIcon icon={faShop} /> Products</h1>

        <Spin spinning={isLoading}>
            <Table
                dataSource={products.sort(sort.by(prop<IProduct, "name">("name")).asc)}
                rowKey="id"
                columns={columns}
                size="small"
            />
        </Spin>
    </div>;
