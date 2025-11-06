import { SelectedTags } from "@common/components/SelectedTags";
import { TagFacets } from "@common/components/TagFacets";
import { Button, Layout, Pagination, Select, Spin } from "antd";
import { switchOn } from "ts-functional";
import { ProductListItem } from "../ProductListItem";
import { ProductsPageProps } from "./ProductsPage.d";
import styles from './ProductsPage.module.scss';
import { CategoryLinks } from "../CategoryLinks";
import clsx from "clsx";

// Pinned-first comparator wrapper
const withPinnedFirst = <T extends { pinned?: boolean }>(cmp: (a: T, b: T) => number) => (a: T, b: T) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return cmp(a, b);
};

export const ProductsPageComponent = ({
    selectTag, removeTag, selectedTagIds,
    q, clearAll, clearSearch,
    products, isLoading, paginator,
    sortBy, setSortBy,
    filters, showFilterBar,
    columns,
}:ProductsPageProps) =>
    <div className={styles.productsPage}>
        <Layout>
            {showFilterBar && <Layout.Sider theme="light"width={300} className={styles.sider}>
                <TagFacets selectedTagIds={selectedTagIds} selectTag={selectTag} removeTag={removeTag} />
            </Layout.Sider>}
            <Layout.Content className={styles.productListContainer}>
                <Spin spinning={isLoading}>
                    <CategoryLinks />
                    <SelectedTags selectedTagIds={selectedTagIds} clearSearch={clearSearch} q={q} removeTag={removeTag} clearAll={clearAll} />
                    <div className={styles.inlineFacets}>
                        {showFilterBar && <div className={styles.filterHeader}>
                            Filter Products...
                            <Button onClick={filters.toggle} size="small" type="link">
                                {filters.isset ? "Hide" : "Show"}
                            </Button>
                        </div>}
                        {filters.isset && <>
                            <hr/>
                            <TagFacets selectedTagIds={selectedTagIds} selectTag={selectTag} removeTag={removeTag} />
                        </>}
                    </div>

                    <div className={styles.orderSelect}>
                        <Select placeholder="Sort By" value={sortBy} onChange={setSortBy}>
                            <Select.Option value="newest">Newest</Select.Option>
                            <Select.Option value="oldest">Oldest</Select.Option>
                            <Select.Option value="priceLow">Price: Low to High</Select.Option>
                            <Select.Option value="priceHigh">Price: High to Low</Select.Option>
                        </Select>
                    </div>
                    <Pagination {...paginator} total={products.length} align="center" showSizeChanger hideOnSinglePage/>
                    <div className={clsx([styles.productList, styles[`columns${columns}`]])}>
                        {products
                            .sort(withPinnedFirst(switchOn(sortBy, {
                                newest:    () => (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime(),
                                oldest:    () => (a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime(),
                                // For price sorts, have a secondary sort by newest if the price is the same
                                priceLow:  () => (a, b) => a.price - b.price || new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime(),
                                priceHigh: () => (a, b) => b.price - a.price || new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime(),
                                default:   () => (a, b) => a.id                              - b.id,
                            }) || (() => 0)))
                            .slice(paginator.pageSize * (paginator.current - 1), paginator.pageSize * paginator.current)
                            .map(product => <ProductListItem key={product.id} product={product} />)
                        }
                    </div>
                    <Pagination {...paginator} total={products.length} align="center" showSizeChanger hideOnSinglePage/>
                </Spin>
            </Layout.Content>
        </Layout>
    </div>;
