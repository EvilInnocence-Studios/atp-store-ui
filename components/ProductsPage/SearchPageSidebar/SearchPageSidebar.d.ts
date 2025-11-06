import { ISearch } from "@store/lib/useSearch";

export declare interface ISearchPageSidebarProps {
    showFilterBar: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface ISearchPageSidebarInputProps {

}

export type SearchPageSidebarProps = ISearchPageSidebarInputProps & ISearchPageSidebarProps & ISearch;