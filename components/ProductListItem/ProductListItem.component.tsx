import { overridable } from "@core/lib/overridable";
import { ProductIdContext } from "@store/lib/context";
import { Layout } from "@theming/components/Layout";
import { ProductListItemProps } from "./ProductListItem.d";

const Provider = ProductIdContext.Provider;

export const ProductListItemComponent = overridable(({ product }: ProductListItemProps) =>
    <Provider value={product.id}>
        <Layout element="productListItem" />
    </Provider>
);
