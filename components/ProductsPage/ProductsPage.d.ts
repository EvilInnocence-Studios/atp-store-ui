import { ITag, ITagGroup } from "@common-shared/tag/types";
import { IPaginator } from "@core/lib/usePaginator";
import { Setter } from "unstateless";

export declare interface IProductsPageProps {
    groups: Array<{group: ITagGroup, tags: ITag[]}>;
    selectTag: (tagId: string) => void;
    selectedTagIds: string[];
    q?: string;
    removeTag: (tagId: string) => void;
    clearAll: () => void;
    clearSearch: () => void;
    products: IProductFull[];
    isLoading: boolean;
    paginator: IPaginator;
    sortBy: string;
    setSortBy: (sortBy:string) => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IProductsPageInputProps {

}

export type ProductsPageProps = IProductsPageInputProps & IProductsPageProps;