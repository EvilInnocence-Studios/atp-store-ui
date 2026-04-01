import { ProductSearch } from "@store/components/ProductSearch";
import { ISubProductsInputProps } from "./SubProducts.d";
import { Label } from "@core/components/Label";
import { Editable } from "@core/components/Editable";

export const SubProductsPropEditor = (
    {id, title}: ISubProductsInputProps,
    _updateProps: (props: any) => void,
    updateProp: (prop: string) => (value: any) => void
) => {
    return <>
        <Label label="Title">
            <Editable
                value={title || ""}
                onChange={updateProp('title')}
            />
        </Label>
        <ProductSearch
            value={id}
            onSelect={updateProp('id')}
        />
    </>;
}
