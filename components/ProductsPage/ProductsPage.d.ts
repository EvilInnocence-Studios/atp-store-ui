import { ITag, ITagGroup } from "@common-shared/tag/types";
import { IPaginator } from "@core/lib/usePaginator";
import { Setter } from "unstateless";

export declare interface IProductsPageProps {
    groups: Array<{group: ITagGroup, tags: ITag[]}>;
    selectTag: (tagId: number) => void;
    selectedTagIds: number[];
    q?: string;
    removeTag: (tagId: number) => void;
    clearAll: () => void;
    clearSearch: () => void;
    products: IProductFull[];
    isLoading: boolean;
    paginator: IPaginator;
    sortBy: string;
    setSortBy: Setter<string>;
}

// What gets passed into the component from the parent as attributes
export declare interface IProductsPageInputProps {

}

export type ProductsPageProps = IProductsPageInputProps & IProductsPageProps;