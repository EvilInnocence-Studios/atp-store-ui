import { ILayoutEditorProps, LayoutEditor } from "@theming/lib/layout/componentRegistry";

export const ProductPriceLayoutEditor:LayoutEditor = ({css, className}:ILayoutEditorProps) => <>
    {css && <style>{css}</style>}
    <div className={className}>
        $99.95
    </div>
</>;
