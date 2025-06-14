import { createInjector, inject, mergeProps } from "unstateless";
import {ProductQueueComponent} from "./ProductQueue.component";
import {IProductQueueInputProps, ProductQueueProps, IProductQueueProps} from "./ProductQueue.d";

const injectProductQueueProps = createInjector(({}:IProductQueueInputProps):IProductQueueProps => {
    return {};
});

const connect = inject<IProductQueueInputProps, ProductQueueProps>(mergeProps(
    injectProductQueueProps,
));

export const ProductQueue = connect(ProductQueueComponent);
