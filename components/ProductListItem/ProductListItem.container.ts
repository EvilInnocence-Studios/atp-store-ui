import { createInjector, inject, mergeProps } from "unstateless";
import {ProductListItemComponent} from "./ProductListItem.component";
import {IProductListItemInputProps, ProductListItemProps, IProductListItemProps} from "./ProductListItem.d";

const injectProductListItemProps = createInjector(({}:IProductListItemInputProps):IProductListItemProps => {
    return {};
});

const connect = inject<IProductListItemInputProps, ProductListItemProps>(mergeProps(
    injectProductListItemProps,
));

export const ProductListItem = connect(ProductListItemComponent);
