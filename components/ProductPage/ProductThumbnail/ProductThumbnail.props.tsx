import { ProductSearch } from "@store/components/ProductSearch";
import { Checkbox } from "antd";
import { IProductThumbnailInputProps } from "./ProductThumbnail.d";

export const ProductThumbnailPropEditor = (
    {id, link}: IProductThumbnailInputProps,
    _updateProps: (props: any) => void,
    updateProp: (prop: string) => (value: any) => void
) => {
    return <>
        <ProductSearch
            value={id}
            onSelect={updateProp('id')}
        />
        <Checkbox checked={link} title="Link to product?" />
    </>;
}
