import { ProductScroller } from "../ProductScroller";
import { NewProductsProps } from "./NewProducts.d";

export const NewProductsComponent = ({count}:NewProductsProps) =>
    <ProductScroller
        title="New Products"
        count={count}
        filter={p => p.enabled}
        sort={(a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()}
    />;
