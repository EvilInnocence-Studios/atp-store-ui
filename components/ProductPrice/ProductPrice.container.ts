import { createInjector, inject, mergeProps } from "unstateless";
import {ProductPriceComponent} from "./ProductPrice.component";
import {IProductPriceInputProps, ProductPriceProps, IProductPriceProps} from "./ProductPrice.d";

const injectProductPriceProps = createInjector(({}:IProductPriceInputProps):IProductPriceProps => {
    return {};
});

const connect = inject<IProductPriceInputProps, ProductPriceProps>(mergeProps(
    injectProductPriceProps,
));

export const ProductPrice = connect(ProductPriceComponent);
