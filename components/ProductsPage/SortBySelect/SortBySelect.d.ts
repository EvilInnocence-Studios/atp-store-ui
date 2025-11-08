import { ISearch } from "@store/lib/useSearch";

export declare interface ISortBySelectProps {
    isVisible: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface ISortBySelectInputProps {

}

export type SortBySelectProps = ISortBySelectInputProps & ISortBySelectProps & ISearch;