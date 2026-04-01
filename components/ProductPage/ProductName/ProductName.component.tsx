import { overridable } from "@core/lib/overridable";
import { ProductNameProps } from "./ProductName.d";

export const ProductNameComponent = overridable(({product, className, css}:ProductNameProps) => <>
    {css && <style>{css}</style>}
    <span className={className}>{product?.name}</span>
</>);

