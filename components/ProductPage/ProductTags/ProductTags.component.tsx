import { overridable } from "@core/lib/overridable";
import { Tag } from "antd";
import { ProductTagsProps } from "./ProductTags.d";
import clsx from "clsx";

export const ProductTagsComponent = overridable(({ className, css, tags }: ProductTagsProps) => <>
    {css && <style>{css}</style>}
    <span className={clsx(className)}>
        {tags.map((tag) => <Tag key={tag.id} className={clsx('productTag', 'tag')}>
            {tag.name}
        </Tag>)}
    </span>
</>);

