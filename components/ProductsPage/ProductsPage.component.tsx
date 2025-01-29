import { Layout, Pagination, Select, Spin, Tag } from "antd";
import { switchOn } from "ts-functional";
import { ProductListItem } from "../ProductListItem";
import { ProductsPageProps } from "./ProductsPage.d";
import styles from './ProductsPage.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTag } from "@fortawesome/free-solid-svg-icons";

export const ProductsPageComponent = ({groups, selectTag, removeTag, selectedTagIds, q, clearAll, clearSearch, products, isLoading, paginator, sortBy, setSortBy}:ProductsPageProps) =>
    <Layout>
        <Layout.Sider theme="light" width={300} className={styles.sider}>
            <div className={styles.tagGroupList}>
                {groups.map(({group, tags}) => <>
                    <h3>{group.name}</h3>
                    <div className={styles.tagList} key={group.id}>
                        {tags.map(tag =>
                            <Tag
                                key={tag.id}
                                color={selectedTagIds.includes(`${tag.id}`) ? 'blue' : undefined}
                                onClick={() => selectedTagIds.includes(`${tag.id}`) ? removeTag(`${tag.id}`) : selectTag(`${tag.id}`)}
                            >
                                {tag.name}
                            </Tag>
                        )}
                    </div>
                </>)}
            </div>
        </Layout.Sider>
        <Layout.Content className={styles.productListContainer}>
            <Spin spinning={isLoading}>
                <div className={styles.selectedTagList}>
                    {selectedTagIds.length === 0 && !q && <h3>All products</h3>}
                    {(selectedTagIds.length > 0 || !!q) && <h3>Search results</h3>}
                    {!!q && <Tag color="blue" onClick={clearSearch}><FontAwesomeIcon icon={faSearch} /> {q}</Tag>}
                    {selectedTagIds.map(tagId =>
                        <Tag key={tagId} color="blue" onClick={() => removeTag(tagId)}>
                            <FontAwesomeIcon icon={faTag} />
                            {groups.reduce((acc, {tags}) => {
                                const tag = tags.find(tag => `${tag.id}` === tagId);
                                return tag ? [...acc, tag.name] : acc;
                            }, [] as string[]).join(', ')}
                        </Tag>
                    )}
                    {(selectedTagIds.length > 0 || !!q) && <Tag onClick={clearAll}>Clear all</Tag>}
                </div>

                <div className={styles.orderSelect}>
                    <Select placeholder="Sort By" value={sortBy} onChange={setSortBy}>
                        <Select.Option value="newest">Newest</Select.Option>
                        <Select.Option value="oldest">Oldest</Select.Option>
                        <Select.Option value="priceLow">Price: Low to High</Select.Option>
                        <Select.Option value="priceHigh">Price: High to Low</Select.Option>
                    </Select>
                </div>
                <Pagination {...paginator} total={products.length} align="center"/>
                <div className={styles.productList}>
                    {products
                        .sort(switchOn(sortBy, {
                            newest:    () => (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime(),
                            oldest:    () => (a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime(),
                            // For price sorts, have a secondary sort by newest if the price is the same
                            priceLow:  () => (a, b) => a.price - b.price || new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime(),
                            priceHigh: () => (a, b) => b.price - a.price || new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime(),
                            default:   () => (a, b) => a.id                              - b.id,
                        }))
                        .slice(paginator.pageSize * (paginator.current - 1), paginator.pageSize * paginator.current)
                        .map(product => <ProductListItem key={product.id} product={product} />)
                    }
                </div>
                <Pagination {...paginator} total={products.length} align="center"/>
            </Spin>
        </Layout.Content>
    </Layout>;
