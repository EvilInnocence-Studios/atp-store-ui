import { ProductSearch } from "@store/components/ProductSearch";
import { IProductNameInputProps } from "./ProductName.d";

export const ProductNamePropEditor = (
    {id}: IProductNameInputProps,
    _updateProps: (props: any) => void,
    updateProp: (prop: string) => (value: any) => void
) => {
    return <>
        <ProductSearch
            onSelect={updateProp("id")}
            value={id}
        />
    </>;
}
