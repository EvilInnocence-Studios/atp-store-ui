import { Layout } from "antd";
import { SearchPageHeader } from "./SearchPageHeader";
import { SearchPageSidebar } from "./SearchPageSidebar";
import { SearchResults } from "./SearchResults";
import { ProductsPageProps } from "./ProductsPage.d";
import styles from './ProductsPage.module.scss';

export const ProductsPageComponent = ({}:ProductsPageProps) =>
    <div className={styles.productsPage}>
        <Layout>
            <SearchPageSidebar />
            <Layout.Content className={styles.productListContainer}>
                <SearchPageHeader />
                <SearchResults />
            </Layout.Content>
        </Layout>
    </div>;
