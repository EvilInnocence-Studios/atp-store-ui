import { ProductSearch } from "@store/components/ProductSearch";
import { IWishlistBtnInputProps } from "./WishlistBtn.d";

export const WishlistBtnPropEditor = (
    {id}: IWishlistBtnInputProps,
    _updateProps: (props: any) => void,
    updateProp: (prop: string) => (value: any) => void
) => {
    return <>
        <ProductSearch
            value={id}
            onSelect={updateProp("id")}
        />
    </>;
}
