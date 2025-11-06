export declare interface ISearchResultsListProps {

}

// What gets passed into the component from the parent as attributes
export declare interface ISearchResultsListInputProps {
    products: IProductFull[];
    paginator: IPaginator;
    columns: string;
    sortBy: string;
}

export type SearchResultsListProps = ISearchResultsListInputProps & ISearchResultsListProps;