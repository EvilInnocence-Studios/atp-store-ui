import { ITag, ITagGroup } from "@common-shared/tag/types";
import { IPaginator } from "@core/lib/usePaginator";
import { IToggle } from "@core/lib/useToggle";
import { ISearch } from "@store/lib/useSearch";
import { Setter } from "unstateless";

export declare interface IProductsPageProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IProductsPageInputProps {

}

export type ProductsPageProps = IProductsPageInputProps & IProductsPageProps;