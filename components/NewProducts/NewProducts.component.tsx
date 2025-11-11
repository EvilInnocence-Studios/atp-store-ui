import { ProductScroller } from "../ProductScroller";
import { NewProductsProps } from "./NewProducts.d";

export const NewProductsComponent = ({count, title, hideCartButton, className}:NewProductsProps) =>
    <ProductScroller
        title={title || "New Products"}
        count={count}
        filter={p => p.enabled}
        hideCartButton={hideCartButton}
        className={className}
        sort={(a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()}
    />;
