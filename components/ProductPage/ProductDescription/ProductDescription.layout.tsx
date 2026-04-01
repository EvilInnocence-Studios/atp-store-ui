import { ILayoutEditorProps, LayoutEditor } from "@theming/lib/layout/componentRegistry";
import Markdown from "react-markdown";

export const ProductDescriptionLayoutEditor:LayoutEditor = ({css, className, ...props}:ILayoutEditorProps) => <>
    {css && <style>{css}</style>}
    <div className={className}>
        <Markdown>Product description goes here.  Product description goes here.  Product description goes here.  Product description goes here.  Product description goes here.  Product description goes here.  Product description goes here.  Product description goes here.  Product description goes here.  </Markdown>
    </div>
</>;
