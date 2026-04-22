import { overridable } from "@core/lib/overridable";
import { Link } from "react-router";
import { ProductNameProps } from "./ProductName.d";

export const ProductNameComponent = overridable(({product, className, css, link}:ProductNameProps) => <>
    {css && <style>{css}</style>}
    <span className={className}>
        {link
            ? <Link to={`products/${product?.url}`}>{product?.name}</Link>
            : <>{product?.name}</>
        }
    </span>
</>);

