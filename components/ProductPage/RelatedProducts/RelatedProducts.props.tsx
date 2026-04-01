import { Label } from "@core/components/Label";
import { IRelatedProductsInputProps } from "./RelatedProducts.d";
import { Editable } from "@core/components/Editable";
import { ProductSearch } from "@store/components/ProductSearch";

export const RelatedProductsPropEditor = (
    {id, title}: IRelatedProductsInputProps,
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
