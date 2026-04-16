import { ILayoutEditorProps, LayoutEditor } from "@theming/lib/layout/componentRegistry";

export const ProductMediaPopupLayoutEditor:LayoutEditor = ({css, className}:ILayoutEditorProps) => <>
    {css && <style>{css}</style>}
    <div className={className} style={{border: '1px dashed #ccc', padding: '20px'}}>
            Product media popup goes here.
    </div>
</>;
