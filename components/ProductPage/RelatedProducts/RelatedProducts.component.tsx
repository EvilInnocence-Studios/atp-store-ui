import { overridable } from "@core/lib/overridable";
import { ProductScroller } from "@store/components/ProductScroller";
import { RelatedProductsProps } from "./RelatedProducts.d";

export const RelatedProductsComponent = overridable(({className, css, relatedProducts}:RelatedProductsProps) => <>
    {css && <style>{css}</style>}
    {relatedProducts.length > 0 && <>
        <div className={className}>
            <ProductScroller
                title="Related Products"
                filter={(p) => relatedProducts.some(related => related.id === p.id)}
                sort={(a, b) => a.name.localeCompare(b.name)}
            />
        </div>
    </>}
</>);

