import { ProductSearch } from "../ProductSearch";
import { IAddToCartBtnInputProps } from "./AddToCartBtn.d";

export const AddToCartBtnPropEditor = (
    {id}: IAddToCartBtnInputProps,
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
