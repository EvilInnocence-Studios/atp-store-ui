import { createInjector, inject, mergeProps } from "unstateless";
import {SearchPageSidebarComponent} from "./SearchPageSidebar.component";
import {ISearchPageSidebarInputProps, SearchPageSidebarProps, ISearchPageSidebarProps} from "./SearchPageSidebar.d";
import { overridable } from "@core/lib/overridable";
import { injectSearch } from "@store/lib/useSearch";
import { useSetting } from "@common/lib/setting/services";

const injectSearchPageSidebarProps = createInjector(({}:ISearchPageSidebarInputProps):ISearchPageSidebarProps => {
    const showFilterBar = useSetting("store.showFilterBar") === "true";

    return {showFilterBar};
});

const connect = inject<ISearchPageSidebarInputProps, SearchPageSidebarProps>(mergeProps(
    injectSearchPageSidebarProps,
    injectSearch,
));
export const connectSearchPageSidebar = connect;

export const SearchPageSidebar = overridable<ISearchPageSidebarInputProps>(connect(SearchPageSidebarComponent));
