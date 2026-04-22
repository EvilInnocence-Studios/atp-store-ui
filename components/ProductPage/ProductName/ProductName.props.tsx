import { ProductSearch } from "@store/components/ProductSearch";
import { Checkbox } from "antd";
import { IProductNameInputProps } from "./ProductName.d";

export const ProductNamePropEditor = (
    {id, link}: IProductNameInputProps,
    _updateProps: (props: any) => void,
    updateProp: (prop: string) => (value: any) => void
) => {
    return <>
        <ProductSearch
            onSelect={updateProp("id")}
            value={id}
        />
        <Checkbox checked={link} onChange={updateProp("link")}/> Link to product?
    </>;
}
