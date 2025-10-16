import { Spin, Tag } from "antd";
import { storePlugins } from "./slots"
import clsx from "clsx";
import styles from './ProductPrice.module.scss';

export const registerProductPricePlugins = () => {
    // Free products
    storePlugins.product.price.register({
        filter: ({product}) => product.price <= 0.0,
        plugin: ({/*product,*/ small}) => <span>{small ? <></> : <Tag>Free</Tag>}</span>,
    });

    // Regular products
    storePlugins.product.price.register({
        filter: ({/*product*/}) => true,
        plugin: ({product, salePrice, isLoading, small}) => <Spin spinning={isLoading}>
            <p className={clsx([styles.price, salePrice < product.price && styles.onSale])}>
                ${product.price.toFixed(2)}
            </p>
            {salePrice < product.price && <p className={styles.salePrice}>
                {!small && <Tag color="green">On Sale!</Tag>} ${salePrice.toFixed(2)}
            </p>}
        </Spin>,
    });
}