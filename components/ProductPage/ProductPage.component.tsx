import { MediaSwitcher } from "@core/components/MediaSwitcher";
import { Col, Row, Spin, Tag } from "antd";
import Markdown from 'react-markdown';
import { prop } from "ts-functional";
import { AddtoCartBtn } from "../AddtoCartBtn";
import { Image } from "../Image";
import { ProductPrice } from "../ProductPrice";
import { ProductScroller } from "../ProductScroller";
import { WishlistBtn } from "../WishlistBtn";
import { ProductPageProps } from "./ProductPage.d";
import styles from './ProductPage.module.scss';
import { overridable } from "@core/lib/overridable";

export const ProductPageComponent = overridable(({ product, media, relatedProducts, subProducts, isLoading, classes = styles }: ProductPageProps) =>
    <Spin spinning={isLoading}>
        {product && <div className={classes.productPage}>
            <div className={classes.header}>
                <h1>{product.name}</h1>
            </div>
            <div className={classes.media}>
                <MediaSwitcher
                    media={media.filter(item => item.id !== product.thumbnailId || item.id === product.mainImageId)}
                    defaultMediaId={product.mainImageId}
                    render={image => <Image key={image.id} productId={product.id} imageId={image.id} />}
                    getId={prop('id')}
                />
            </div>
            <div className={classes.productInfo}>
                <Row className={classes.cartInfo}>
                    <Col xs={24} sm={12} md={24} lg={12} className={classes.cartPrice}>
                        <ProductPrice product={product} />
                    </Col>
                    <Col xs={24} sm={12} md={24} lg={12} className={classes.cartActions}>
                        <AddtoCartBtn product={product} size="large" />
                        <WishlistBtn product={product} />
                    </Col>
                </Row>
                <h2>Tags</h2>
                <div className={classes.tags}>
                    {product.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                </div>
                <h2>Description</h2>
                <div className={classes.description}>
                    <Markdown>{product.description}</Markdown>
                </div>
            </div>
            <div className={classes.relatedProductsLists}>
                {product.productType === 'grouped' && <>
                    <ProductScroller
                        title="Grouped Products"
                        filter={(p) => subProducts.some(subProduct => subProduct.id === p.id)}
                        sort={(a, b) => a.name.localeCompare(b.name)}
                    />
                </>}

                {relatedProducts.length > 0 && <>
                    <div className={classes.relatedProducts}>
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
);
