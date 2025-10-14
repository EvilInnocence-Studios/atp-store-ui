import { storePlugins } from "@store/lib/plugin/slots";
import { ProductPriceProps } from "./ProductPrice.d";

export const ProductPriceComponent = ({product, salePrice, isLoading, small}:ProductPriceProps) =>
    storePlugins.product.price.render({product, salePrice, isLoading, small});
