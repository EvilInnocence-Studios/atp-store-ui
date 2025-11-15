import { createInjector, inject, mergeProps } from "unstateless";
import {SearchResultsListComponent} from "./SearchResultsList.component";
import {ISearchResultsListInputProps, SearchResultsListProps, ISearchResultsListProps} from "./SearchResultsList.d";
import { overridable } from "@core/lib/overridable";

const injectSearchResultsListProps = createInjector(({}:ISearchResultsListInputProps):ISearchResultsListProps => {
    return {};
});

const connect = inject<ISearchResultsListInputProps, SearchResultsListProps>(mergeProps(
    injectSearchResultsListProps,
));
export const connectSearchResultsList = connect;

export const SearchResultsList = overridable<ISearchResultsListInputProps>(connect(SearchResultsListComponent));
