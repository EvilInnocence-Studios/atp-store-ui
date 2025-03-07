import { Spin } from "antd";
import {ProductScrollerProps} from "./ProductScroller.d";
import styles from './ProductScroller.module.scss';
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { ProductListItem } from "../ProductListItem";

export const ProductScrollerComponent = ({products, isLoading, scroll}:ProductScrollerProps) =>
    <Spin spinning={isLoading}>
        <h2 className={styles.scrollerTitle}>New Products</h2>
        <div
            className={clsx([styles.scroller, scroll.x.canScrollLeft && styles.canScrollLeft, scroll.x.canScrollRight && styles.canScrollRight])}
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
