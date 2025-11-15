import { storePlugins } from "@store/lib/plugin/slots";
import { ProductPriceProps } from "./ProductPrice.d";
import { overridable } from "@core/lib/overridable";

export const ProductPriceComponent = overridable(({product, salePrice, isLoading, small}:ProductPriceProps) =>
    storePlugins.product.price.render({product, salePrice, isLoading, small})
);
