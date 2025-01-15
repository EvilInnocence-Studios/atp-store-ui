import { Link } from "react-router";
import { AddtoCartBtn } from "../AddtoCartBtn";
import { Image } from "../Image";
import { ProductPrice } from "../ProductPrice";
import { ProductListItemProps } from "./ProductListItem.d";
import styles from './ProductListItem.module.scss';

export const ProductListItemComponent = ({product}:ProductListItemProps) =>
    <div className={styles.productListItem}>
        <Link to={`/products/${product.url}`}>
            <Image productId={product.id} imageId={product.thumbnailId} />
        </Link>
        <div className={styles.productInfo}>
            <Link to={`/products/${product.url}`}><h3>{product.name}</h3></Link>
            <ProductPrice product={product} />
            <AddtoCartBtn product={product} />
        </div>
    </div>;
