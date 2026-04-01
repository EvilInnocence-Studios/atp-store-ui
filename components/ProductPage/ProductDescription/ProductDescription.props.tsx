import { ProductSearch } from "@store/components/ProductSearch";
import { IProductDescriptionInputProps } from "./ProductDescription.d";

export const ProductDescriptionPropEditor = (
    {id}: IProductDescriptionInputProps,
    _updateProps: (props: any) => void,
    updateProp: (prop: string) => (value: any) => void
) => {
    return <>
        <ProductSearch
            value={id}
            onSelect={updateProp('id')}
        />
    </>;
}
