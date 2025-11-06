import { ISearch } from "@store/lib/useSearch";

export declare interface ISelectedStoreTagsProps {

}

// What gets passed into the component from the parent as attributes
export declare interface ISelectedStoreTagsInputProps {

}

export type SelectedStoreTagsProps = ISelectedStoreTagsInputProps & ISelectedStoreTagsProps & ISearch;