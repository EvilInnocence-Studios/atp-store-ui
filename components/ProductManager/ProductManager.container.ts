import { createInjector, inject, mergeProps } from "unstateless";
import {ProductManagerComponent} from "./ProductManager.component";
import {IProductManagerInputProps, ProductManagerProps, IProductManagerProps} from "./ProductManager.d";

const injectProductManagerProps = createInjector(({}:IProductManagerInputProps):IProductManagerProps => {
    return {};
});

const connect = inject<IProductManagerInputProps, ProductManagerProps>(mergeProps(
    injectProductManagerProps,
));

export const ProductManager = connect(ProductManagerComponent);
