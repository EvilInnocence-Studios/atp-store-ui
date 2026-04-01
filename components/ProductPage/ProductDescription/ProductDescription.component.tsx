import { overridable } from "@core/lib/overridable";
import Markdown from "react-markdown";
import { ProductDescriptionProps } from "./ProductDescription.d";

export const ProductDescriptionComponent = overridable(({className, css, product}:ProductDescriptionProps) => <>
    {css && <style>{css}</style>}
    <div className={className}>
        <Markdown>{product?.description}</Markdown>
    </div>
</>);

