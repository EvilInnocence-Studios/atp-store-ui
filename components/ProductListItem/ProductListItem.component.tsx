import { AddtoCartBtn } from "../AddtoCartBtn";
import { Image } from "../Image";
import { ProductPrice } from "../ProductPrice";
import { ProductListItemProps } from "./ProductListItem.d";
import styles from './ProductListItem.module.scss';

export const ProductListItemComponent = ({product}:ProductListItemProps) =>
    <div className={styles.productListItem}>
        <Image productId={product.id} imageId={product.thumbnailId} />
        <div className={styles.productInfo}>
            <h3>{product.name}</h3>
            <ProductPrice product={product} />
            <AddtoCartBtn product={product} />
        </div>
    </div>;
