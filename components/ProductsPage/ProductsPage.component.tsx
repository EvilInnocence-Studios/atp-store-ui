import { Layout } from "antd";
import { SearchPageHeader } from "./SearchPageHeader";
import { SearchPageSidebar } from "./SearchPageSidebar";
import { SearchResults } from "./SearchResults";
import { ProductsPageProps } from "./ProductsPage.d";
import styles from './ProductsPage.module.scss';
import { overridable } from "@core/lib/overridable";

export const ProductsPageComponent = overridable(({ classes = styles }: ProductsPageProps) =>
    <div className={classes.productsPage}>
        <Layout className="productsPage">
            <SearchPageSidebar />
            <Layout.Content className={classes.productListContainer}>
                <SearchPageHeader />
                <SearchResults />
            </Layout.Content>
        </Layout>
    </div>
);