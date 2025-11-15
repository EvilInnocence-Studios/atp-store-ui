import { createInjector, inject, mergeProps } from "unstateless";
import {SearchPageHeaderComponent} from "./SearchPageHeader.component";
import {ISearchPageHeaderInputProps, SearchPageHeaderProps, ISearchPageHeaderProps} from "./SearchPageHeader.d";
import { overridable } from "@core/lib/overridable";

const injectSearchPageHeaderProps = createInjector(({}:ISearchPageHeaderInputProps):ISearchPageHeaderProps => {
    return {};
});

const connect = inject<ISearchPageHeaderInputProps, SearchPageHeaderProps>(mergeProps(
    injectSearchPageHeaderProps,
));
export const connectSearchPageHeader = connect;

export const SearchPageHeader = overridable<ISearchPageHeaderInputProps>(connect(SearchPageHeaderComponent));
