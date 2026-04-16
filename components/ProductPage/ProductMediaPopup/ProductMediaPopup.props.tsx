import { ProductSearch } from "@store/components/ProductSearch";
import { IProductMediaPopupInputProps } from "./ProductMediaPopup.d";

export const ProductMediaPopupPropEditor = (
    {id}: IProductMediaPopupInputProps,
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
