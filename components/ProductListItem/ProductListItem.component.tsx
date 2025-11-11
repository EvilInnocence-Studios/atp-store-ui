import clsx from "clsx";
import { Link } from "react-router";
import { AddtoCartBtn } from "../AddtoCartBtn";
import { ProductPrice } from "../ProductPrice";
import { ProductThumbnail } from "../ProductThumbnail";
import { ProductListItemProps } from "./ProductListItem.d";
import styles from './ProductListItem.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbTack } from "@fortawesome/free-solid-svg-icons";

// TODO: Instead of making productPrice and AddToCartBtn plugins for donation price, make productlist item pluggable
// It can link to a donation page instead of a product page
// The donate button will place a donation directly rather than going through the cart process
// Backend will keep track of donations per user in a new table


export const ProductListItemComponent = ({product, textSize, hideTags, hideCartButton}:ProductListItemProps) =>
    <div className={styles.productListItem}>
        {product.pinned && <FontAwesomeIcon
            icon={faThumbTack}
            className={styles.pinnedIcon}
            title="Pinned Product"
        />}
        <div className={styles.productMain}>
            <ProductThumbnail product={product} />
            <div className={clsx([styles.productInfo, styles[textSize || "default"]])}>
                <Link to={`/products/${product.url}`}><h3>{product.name}</h3></Link>
            </div>
        </div>
        <div className={styles.productDetails}>
            <ProductPrice product={product} small={hideTags} />
            {!hideCartButton && <AddtoCartBtn product={product} />}
        </div>
    </div>;
