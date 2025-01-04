import { Spin } from "antd";
import {NewProductsProps} from "./NewProducts.d";
import styles from './NewProducts.module.scss';
import { ProductListItem } from "../ProductListItem";

export const NewProductsComponent = ({products, isLoading}:NewProductsProps) =>
    <Spin spinning={isLoading}>
        <h2>New Products</h2>
        <div className={styles.newProducts}>
            {products.map((product) => <ProductListItem product={product} key={product.id} />)}
        </div>
    </Spin>;
