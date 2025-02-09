import { Link } from "react-router";
import { AddtoCartBtn } from "../AddtoCartBtn";
import { Image } from "../Image";
import { ProductPrice } from "../ProductPrice";
import { ProductListItemProps } from "./ProductListItem.d";
import styles from './ProductListItem.module.scss';

export const ProductListItemComponent = ({product, textSize}:ProductListItemProps) =>
    <div className={styles.productListItem}>
        <Link to={`/products/${product.url}`}>
            {product.mainImageId && <Image productId={product.id} imageId={product.mainImageId} />}
        </Link>
        <div className={styles.productInfo}>
            <Link to={`/products/${product.url}`}><h3 className={styles[textSize || "default"]}>{product.name}</h3></Link>
        </div>
        <div className={styles.productDetails}>
            <ProductPrice product={product} />
            <AddtoCartBtn product={product} />
        </div>
    </div>;
