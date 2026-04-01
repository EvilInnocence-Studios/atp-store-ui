import { ILayoutEditorProps, LayoutEditor } from "@theming/lib/layout/componentRegistry";

export const SubProductsLayoutEditor:LayoutEditor = ({css, className, title}:ILayoutEditorProps) => <>
    {css && <style>{css}</style>}
    <div className={className}>
        <h2>{title || "Sub Products"}</h2>
        <div style={{
            width: 'calc(100% - 80px)',
            border: '1px dashed #888888',
            padding: '40px',
            margin: '40px',
            textAlign: 'center',
            verticalAlign: 'middle',
            lineHeight: '100px',
            fontSize: '20px',
            color: '#888888',
        }}>
            Sub-Products go here.
        </div>
    </div>
</>;
