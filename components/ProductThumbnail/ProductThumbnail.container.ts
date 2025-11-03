import { overridable } from "@core/lib/overridable";
import { createInjector, inject, mergeProps } from "unstateless";
import { ProductThumbnailComponent } from "./ProductThumbnail.component";
import { IProductThumbnailInputProps, IProductThumbnailProps, ProductThumbnailProps } from "./ProductThumbnail.d";

const injectProductThumbnailProps = createInjector(({}:IProductThumbnailInputProps):IProductThumbnailProps => {
    return {};
});

const connect = inject<IProductThumbnailInputProps, ProductThumbnailProps>(mergeProps(
    injectProductThumbnailProps,
));

export const ProductThumbnail = overridable<IProductThumbnailInputProps>(connect(ProductThumbnailComponent));
