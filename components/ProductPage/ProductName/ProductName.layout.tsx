import { ILayoutEditorProps, LayoutEditor } from "@theming/lib/layout/componentRegistry";

export const ProductNameLayoutEditor:LayoutEditor = ({css, className}:ILayoutEditorProps) => <>
    {css && <style>{css}</style>}
    <span className={className}>
        Product Name Goes Here
    </span>
</>;
