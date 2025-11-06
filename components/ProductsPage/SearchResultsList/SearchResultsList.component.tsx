import { overridable } from "@core/lib/overridable";
import { IProduct } from "@store-shared/product/types";
import clsx from "clsx";
import { switchOn } from "ts-functional";
import { ProductListItem } from "../../ProductListItem";
import { SearchResultsListProps } from "./SearchResultsList.d";
import styles from './SearchResultsList.module.scss';

// Pinned-first comparator wrapper
const withPinnedFirst = <T extends { pinned?: boolean }>(cmp: (a: T, b: T) => number) => (a: T, b: T) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return cmp(a, b);
};

export const sortProducts = (sortBy:string) => (products:IProduct[]) => products.sort(withPinnedFirst(switchOn(sortBy, {
    newest:    () => (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime(),
    oldest:    () => (a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime(),
    // For price sorts, have a secondary sort by newest if the price is the same
    priceLow:  () => (a, b) => a.price - b.price || new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime(),
    priceHigh: () => (a, b) => b.price - a.price || new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime(),
    default:   () => (a, b) => +a.id - +b.id,
}) || (() => 0)));

export const SearchResultsListComponent = overridable<SearchResultsListProps>(({products, paginator, columns, sortBy}:SearchResultsListProps) =>
    <div className={clsx([styles.productList, styles[`columns${columns}`]])}>
        {sortProducts(sortBy)(products)
            .slice(paginator.pageSize * (paginator.current - 1), paginator.pageSize * paginator.current)
            .map(product => <ProductListItem key={product.id} product={product} />)
        }
    </div>

);
