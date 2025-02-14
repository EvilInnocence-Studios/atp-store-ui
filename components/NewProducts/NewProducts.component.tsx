import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spin } from "antd";
import { ProductListItem } from "../ProductListItem";
import { NewProductsProps } from "./NewProducts.d";
import styles from './NewProducts.module.scss';
import clsx from "clsx";

export const NewProductsComponent = ({products, isLoading, scroll}:NewProductsProps) =>
    <Spin spinning={isLoading}>
        <h2 className={styles.newProductsTitle}>New Products</h2>
        <div
            className={clsx([styles.newProducts, scroll.x.canScrollLeft && styles.canScrollLeft, scroll.x.canScrollRight && styles.canScrollRight])}
            ref={scroll.containerRef}
        >
            <FontAwesomeIcon
                icon={faCaretLeft}
                className={clsx([styles.arrow, styles.left])}
                onTouchStart={() => scroll.x.left()}
                onTouchEnd={scroll.stop}
                onMouseDown={() => scroll.x.left()}
                onMouseUp={scroll.stop}
                onMouseLeave={scroll.stop}
                style={{visibility: scroll.x.canScrollLeft ? 'visible' : 'hidden'}}
            />
            <FontAwesomeIcon
                icon={faCaretRight}
                className={clsx([styles.arrow, styles.right])}
                onTouchStart={() => scroll.x.right()}
                onTouchEnd={scroll.stop}
                onMouseDown={() => scroll.x.right()}
                onMouseUp={scroll.stop}
                onMouseLeave={scroll.stop}
                style={{visibility: scroll.x.canScrollRight ? 'visible' : 'hidden'}}
            />
            <div className={styles.productList} style={{left: scroll.x.offset}} ref={scroll.ref}>
                {products.map((product) => <ProductListItem product={product} key={product.id} textSize="small"/>)}
            </div>
        </div>
    </Spin>;
