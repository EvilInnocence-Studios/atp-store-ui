import { ProductSearch } from "@store/components/ProductSearch";
import { IProductPriceInputProps } from "./ProductPrice.d";
import { Switch } from "antd";

export const ProductPricePropEditor = (
    {id, small}: IProductPriceInputProps,
    _updateProps: (props: any) => void,
    updateProp: (prop: string) => (value: any) => void
) => {
    return <>
        <ProductSearch
            value={id}
            onSelect={updateProp('id')}
        />
        <Switch
            checked={small}
            onChange={updateProp('small')}
            checkedChildren="Small"
            unCheckedChildren="Normal"
        />
    </>;
}
