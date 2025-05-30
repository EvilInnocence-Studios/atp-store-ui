import { Spin, Tag } from "antd";
import {ProductPriceProps} from "./ProductPrice.d";
import clsx from "clsx";
import styles from './ProductPrice.module.scss';

export const ProductPriceComponent = ({product, salePrice, isLoading, small}:ProductPriceProps) =><>{
    product.subscriptionOnly    ?   <Tag>BSP</Tag>          :
         product.price > 0.0    ?   <Spin spinning={isLoading}>
                                        <p className={clsx([styles.price, salePrice < product.price && styles.onSale])}>
                                            ${product.price.toFixed(2)}
                                        </p>
                                        {salePrice < product.price && <p className={styles.salePrice}>
                                            {!small && <Tag color="green">On Sale!</Tag>} ${salePrice.toFixed(2)}
                                        </p>}
                                    </Spin>
                                :   <Tag>Free</Tag>
  }</>;
