import { overridable } from "@core/lib/overridable";
import { createInjector, inject, mergeProps } from "unstateless";
import { ProductQueueComponent } from "./ProductQueue.component";
import { IProductQueueInputProps, IProductQueueProps, ProductQueueProps } from "./ProductQueue.d";

const injectProductQueueProps = createInjector(({}:IProductQueueInputProps):IProductQueueProps => {
    return {};
});

const connect = inject<IProductQueueInputProps, ProductQueueProps>(mergeProps(
    injectProductQueueProps,
));
export const connectProductQueue = connect;

export const ProductQueue = overridable<IProductQueueInputProps>(connect(ProductQueueComponent));
