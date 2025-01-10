import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spin } from "antd";
import { ProductListItem } from "../ProductListItem";
import { NewProductsProps } from "./NewProducts.d";
import styles from './NewProducts.module.scss';
import clsx from "clsx";

export const NewProductsComponent = ({products, isLoading, scroll}:NewProductsProps) =>
    <Spin spinning={isLoading}>
        <h2>New Products</h2>
        <div className={styles.newProducts} ref={scroll.containerRef}>
            <FontAwesomeIcon
                icon={faCaretLeft}
                className={clsx([styles.arrow, styles.left])}
                onMouseDown={() => scroll.x.left()}
                onMouseUp={scroll.stop}
                onMouseLeave={scroll.stop}
                style={{visibility: scroll.x.canScrollLeft ? 'visible' : 'hidden'}}
            />
            <FontAwesomeIcon
                icon={faCaretRight}
                className={clsx([styles.arrow, styles.right])}
                onMouseDown={() => scroll.x.right()}
                onMouseUp={scroll.stop}
                onMouseLeave={scroll.stop}
                style={{visibility: scroll.x.canScrollRight ? 'visible' : 'hidden'}}
            />
            <div className={styles.productList} style={{left: scroll.x.offset}} ref={scroll.ref}>
                {products.map((product) => <ProductListItem product={product} key={product.id} />)}
            </div>
        </div>
    </Spin>;
