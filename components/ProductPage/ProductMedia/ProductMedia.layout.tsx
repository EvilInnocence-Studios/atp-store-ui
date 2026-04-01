import { ILayoutEditorProps, LayoutEditor } from "@theming/lib/layout/componentRegistry";

import src from "./product-image-placeholder.png";

export const ProductMediaLayoutEditor:LayoutEditor = ({css, className}:ILayoutEditorProps) => <>
    {css && <style>{css}</style>}
    <div className={className}>
            <img src={src} />
    </div>
</>;
