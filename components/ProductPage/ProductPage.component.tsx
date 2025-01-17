import { Col, Row, Spin, Tag } from "antd";
import { AddtoCartBtn } from "../AddtoCartBtn";
import { MediaSwitcher } from "../MediaSwitcher";
import { ProductListItem } from "../ProductListItem";
import { ProductPrice } from "../ProductPrice";
import { ProductPageProps } from "./ProductPage.d";
import styles from './ProductPage.module.scss';
import Markdown from 'marked-react';
import { WishlistBtn } from "../WishlistBtn";

export const ProductPageComponent = ({product, media, relatedProducts, isLoading}:ProductPageProps) =>
    <Spin spinning={isLoading}>
        <div className={styles.productPage}>
            {product && <>
                <h1>{product.name}</h1>
                <Row gutter={16}>
                    <Col xs={12}>
                        <MediaSwitcher
                            productId={product.id}
                            media={media.filter(item => item.id !== product.thumbnailId)}
                            defaultMediaId={product.mainImageId}
                        />
                    </Col>
                    <Col xs={12} className={styles.productInfo}>
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
                        {product.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                        <h2>Description</h2>
                        <Markdown>{product.description}</Markdown>
                    </Col>
                </Row>
                <h2>Related products</h2>
                <div className={styles.relatedProducts}>
                    {relatedProducts.map((related) => <ProductListItem key={related.id} product={related} />)}
                </div>
            </>}
        </div>
    </Spin>
