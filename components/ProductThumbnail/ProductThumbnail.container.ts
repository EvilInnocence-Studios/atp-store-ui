import { createInjector, inject, mergeProps } from "unstateless";
import {ProductThumbnailComponent} from "./ProductThumbnail.component";
import {IProductThumbnailInputProps, ProductThumbnailProps, IProductThumbnailProps} from "./ProductThumbnail.d";

const injectProductThumbnailProps = createInjector(({}:IProductThumbnailInputProps):IProductThumbnailProps => {
    return {};
});

const connect = inject<IProductThumbnailInputProps, ProductThumbnailProps>(mergeProps(
    injectProductThumbnailProps,
));

export const ProductThumbnail = connect(ProductThumbnailComponent);
