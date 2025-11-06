import { overridable } from "@core/lib/overridable";
import { Pagination, Spin } from "antd";
import { SearchResultsList } from "../SearchResultsList";
import { SearchResultsProps } from "./SearchResults.d";

export const SearchResultsComponent = overridable<SearchResultsProps>(({columns, sortBy, products, paginator, isLoading}:SearchResultsProps) =>
    <Spin spinning={isLoading}>
        <Pagination {...paginator} total={products.length} align="center" showSizeChanger hideOnSinglePage/>
        <SearchResultsList products={products} paginator={paginator} columns={columns} sortBy={sortBy} />
        <Pagination {...paginator} total={products.length} align="center" showSizeChanger hideOnSinglePage/>
    </Spin>
);
