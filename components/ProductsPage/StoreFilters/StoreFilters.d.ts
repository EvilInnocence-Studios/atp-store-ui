import { ISearch } from "@store/lib/useSearch";

export declare interface IStoreFiltersProps {
    filters: IToggle;
    showFilterBar: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface IStoreFiltersInputProps {

}

export type StoreFiltersProps = IStoreFiltersInputProps & IStoreFiltersProps & ISearch;