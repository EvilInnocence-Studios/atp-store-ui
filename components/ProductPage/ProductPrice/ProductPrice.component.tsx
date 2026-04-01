import { overridable } from "@core/lib/overridable";
import { storePlugins } from "@store/lib/plugin/slots";
import { ProductPriceProps } from "./ProductPrice.d";

export const ProductPriceComponent = overridable(({className, css, product, salePrice, isLoading, small}:ProductPriceProps) => <>
    {css && <style>{css}</style>}
    <span className={className}>
        {storePlugins.product.price.render({product, salePrice, isLoading, small})}
    </span>
</>);

