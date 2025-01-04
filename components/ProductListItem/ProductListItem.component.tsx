import { Tag } from "antd";
import { Image } from "../Image";
import {ProductListItemProps} from "./ProductListItem.d";
import styles from './ProductListItem.module.scss';
import { AddtoCartBtn } from "../AddtoCartBtn";

export const ProductListItemComponent = ({product}:ProductListItemProps) =>
    <div className={styles.productListItem}>
        <Image productId={product.id} imageId={product.thumbnailId} />
        <div className={styles.productInfo}>
            <h3>{product.name}</h3>
            {product.subscriptionOnly && <Tag>BSP</Tag>}
            {!product.subscriptionOnly && <p>${product.price}</p>}
            <AddtoCartBtn productId={product.id} />
        </div>
    </div>;
