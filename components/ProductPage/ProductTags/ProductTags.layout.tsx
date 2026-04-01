import { ILayoutEditorProps, LayoutEditor } from "@theming/lib/layout/componentRegistry";
import { Tag } from "antd";

export const ProductTagsLayoutEditor:LayoutEditor = ({css, className}:ILayoutEditorProps) => <>
    {css && <style>{css}</style>}
    <span className={className}>
        <Tag>A Tag</Tag>
        <Tag>Another Tag</Tag>
        <Tag>Yet Another Tag</Tag>
        <Tag>And Another Tag</Tag>
    </span>
</>;
