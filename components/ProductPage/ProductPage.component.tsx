import { Col, Row, Spin, Tag } from "antd";
import { AddtoCartBtn } from "../AddtoCartBtn";
import { MediaSwitcher } from "../MediaSwitcher";
import { ProductListItem } from "../ProductListItem";
import { ProductPrice } from "../ProductPrice";
import { ProductPageProps } from "./ProductPage.d";
import styles from './ProductPage.module.scss';
import Markdown from 'marked-react';
import { WishlistBtn } from "../WishlistBtn";
import { MiniProduct } from "../MiniProduct";
import { NotFoundPage } from "@public/components/NotFoundPage";

export const ProductPageComponent = ({product, media, relatedProducts, subProducts, isLoading}:ProductPageProps) =>
    <Spin spinning={isLoading}>
        {!isLoading && !product && <NotFoundPage />}
        {product && <div className={styles.productPage}>
            <div className={styles.header}>
                <h1>{product.name}</h1>
            </div>
            <div className={styles.media}>
                <MediaSwitcher
                    productId={product.id}
                    media={media.filter(item => item.id !== product.thumbnailId || item.id === product.mainImageId)}
                    defaultMediaId={product.mainImageId}
                />
            </div>
            <div className={styles.productInfo}>
                <Row className={styles.cartInfo}>
                    <Col xs={12} className={styles.cartPrice}>
                        <ProductPrice product={product} />
                    </Col>
                    <Col xs={12} className={styles.cartActions}>
                        <AddtoCartBtn product={product} />
                        <WishlistBtn product={product} />
                    </Col>
                </Row>
                <h2>Tags</h2>
                <div className={styles.tags}>
                    {product.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                </div>
                <h2>Description</h2>
                <Markdown>{product.description}</Markdown>

            </div>
            <div className={styles.relatedProductsLists}>
                {product.productType === 'grouped' && <>
                    <h2>Included products</h2>
                    <div className={styles.subProducts}>
                        {subProducts.map(subProduct => <MiniProduct key={subProduct.id} product={subProduct} />)}
                    </div>
                </>}

                {relatedProducts.length > 0 && <>
                    <h2>Related products</h2>
                    <div className={styles.relatedProducts}>
                        {relatedProducts.map((related) => <ProductListItem key={related.id} product={related} />)}
                    </div>
                </>}
            </div>
        </div>}
    </Spin>
