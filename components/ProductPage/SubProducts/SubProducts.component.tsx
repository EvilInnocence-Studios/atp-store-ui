import { overridable } from "@core/lib/overridable";
import { ProductScroller } from "@store/components/ProductScroller";
import { SubProductsProps } from "./SubProducts.d";

export const SubProductsComponent = overridable(({className, css, subProducts, product, title}:SubProductsProps) => <>
    {css && <style>{css}</style>}
    {product && product.productType === 'grouped' && <div className={className}>
        <ProductScroller
            title={title || "Grouped Products"}
            filter={(p) => subProducts.some(subProduct => subProduct.id === p.id)}
            sort={(a, b) => a.name.localeCompare(b.name)}
        />
    </div>}
</>);

