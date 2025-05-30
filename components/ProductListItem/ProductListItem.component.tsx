import { Link } from "react-router";
import { AddtoCartBtn } from "../AddtoCartBtn";
import { Image } from "../Image";
import { ProductPrice } from "../ProductPrice";
import { ProductListItemProps } from "./ProductListItem.d";
import styles from './ProductListItem.module.scss';
import clsx from "clsx";

export const ProductListItemComponent = ({product, textSize, hideTags}:ProductListItemProps) =>
    <div className={styles.productListItem}>
        <div className={styles.productMain}>
            <Link to={`/products/${product.url}`}>
                {(product.mainImageId || product.thumbnailId) && <Image productId={product.id} imageId={product.mainImageId || product.thumbnailId} />}
            </Link>
            <div className={clsx([styles.productInfo, styles[textSize || "default"]])}>
                <Link to={`/products/${product.url}`}><h3>{product.name}</h3></Link>
            </div>
        </div>
        <div className={styles.productDetails}>
            <ProductPrice product={product} small={hideTags} />
            <AddtoCartBtn product={product} />
        </div>
    </div>;
