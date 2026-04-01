import { overridable } from "@core/lib/overridable";
import { Tag } from "antd";
import { ProductTagsProps } from "./ProductTags.d";

export const ProductTagsComponent = overridable(({className, css, tags}:ProductTagsProps) => <>
    {css && <style>{css}</style>}
    <span className={className}>
        {tags.map((tag) => <Tag key={tag.id}>{tag.name}</Tag>)}
    </span>
</>);

