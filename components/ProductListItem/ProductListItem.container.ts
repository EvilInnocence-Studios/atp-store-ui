import { overridable } from "@core/lib/overridable";
import { createInjector, inject, mergeProps } from "unstateless";
import { ProductListItemComponent } from "./ProductListItem.component";
import { IProductListItemInputProps, IProductListItemProps, ProductListItemProps } from "./ProductListItem.d";

const injectProductListItemProps = createInjector(({}:IProductListItemInputProps):IProductListItemProps => {
    return {};
});

const connect = inject<IProductListItemInputProps, ProductListItemProps>(mergeProps(
    injectProductListItemProps,
));

export const ProductListItem = overridable<IProductListItemInputProps>(connect(ProductListItemComponent));
