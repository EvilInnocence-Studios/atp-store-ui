import { ProductSearch } from "@store/components/ProductSearch";
import { IProductThumbnailInputProps } from "./ProductThumbnail.d";

export const ProductThumbnailPropEditor = (
    {id}: IProductThumbnailInputProps,
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
