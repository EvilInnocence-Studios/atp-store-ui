import { ProductSearch } from "@store/components/ProductSearch";
import { IProductMediaInputProps } from "./ProductMedia.d";

export const ProductMediaPropEditor = (
    {id}: IProductMediaInputProps,
    updateProps: (props: any) => void,
    updateProp: (prop: string) => (value: any) => void
) => {
    return <>
        <ProductSearch
            onSelect={updateProp("id")}
            value={id}
        />
    </>;
}
