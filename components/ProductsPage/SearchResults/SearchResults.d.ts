import { IPaginator } from "@core/lib/usePaginator";
import { IProductFull } from "@store-shared/product/types";
import { ISearch } from "@store/lib/useSearch";

export declare interface ISearchResultsProps extends ISearch{
    products: IProductFull[];
    isLoading: boolean;
    paginator: IPaginator;
    columns: string;
}

// What gets passed into the component from the parent as attributes
export declare interface ISearchResultsInputProps {

}

export type SearchResultsProps = ISearchResultsInputProps & ISearchResultsProps;