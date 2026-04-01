import { ProductSearch } from "@store/components/ProductSearch";
import { IProductTagsInputProps } from "./ProductTags.d";

export const ProductTagsPropEditor = (
    {id}: IProductTagsInputProps,
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
