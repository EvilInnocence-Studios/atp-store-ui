import { Alert, Col, Row, Spin, Tag } from "antd";
import Markdown from 'react-markdown';
import { AddtoCartBtn } from "../AddtoCartBtn";
import { MediaSwitcher } from "../MediaSwitcher";
import { ProductPrice } from "../ProductPrice";
import { ProductScroller } from "../ProductScroller";
import { WishlistBtn } from "../WishlistBtn";
import { ProductPageProps } from "./ProductPage.d";
import styles from './ProductPage.module.scss';
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const ProductPageComponent = ({product, media, relatedProducts, subProducts, isLoading, infoUrl}:ProductPageProps) =>
    <Spin spinning={isLoading}>
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
                {product.subscriptionOnly && <>
                    <Alert className={styles.info} message={
                        <>
                            <b>BSP</b> products are <b>FREE</b> but only available to <b>Backstage Pass Subscribers</b>.  Subscribe to a monthly plan to get instant access to this and over 900 other products at no extra cost.  New products are released each month.
                            <div style={{textAlign: "right"}}>
                                <Link to={infoUrl || ""}>Learn more <FontAwesomeIcon icon={faArrowRight} /></Link>
                            </div>
                        </>
                    } type="info" />
                </>}
                <h2>Tags</h2>
                <div className={styles.tags}>
                    {product.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                </div>
                <h2>Description</h2>
                <Markdown>{product.description}</Markdown>

            </div>
            <div className={styles.relatedProductsLists}>
                {product.productType === 'grouped' && <>
                    <ProductScroller
                        title="Grouped Products"
                        filter={(p) => subProducts.some(subProduct => subProduct.id === p.id)}
                        sort={(a, b) => a.name.localeCompare(b.name)}
                    />
                </>}

                {relatedProducts.length > 0 && <>
                    <div className={styles.relatedProducts}>
                        <ProductScroller
                            title="Related Products"
                            filter={(p) => relatedProducts.some(related => related.id === p.id)}
                            sort={(a, b) => a.name.localeCompare(b.name)}
                        />
                    </div>
                </>}
            </div>
        </div>}
    </Spin>
