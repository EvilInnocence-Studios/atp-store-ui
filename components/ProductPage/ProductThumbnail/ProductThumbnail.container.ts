import { overridable } from "@core/lib/overridable";
import { injectProductContextProps } from "@store/lib/context";
import { withLayoutMetadata } from "@theming/lib/layout/componentRegistry";
import { createInjector, inject, mergeProps } from "unstateless";
import icon from './icon.svg';
import { ProductThumbnailComponent } from "./ProductThumbnail.component";
import { IProductThumbnailInputProps, IProductThumbnailProps, ProductThumbnailProps } from "./ProductThumbnail.d";
import { ProductThumbnailLayoutEditor } from "./ProductThumbnail.layout";
import { ProductThumbnailPropEditor } from "./ProductThumbnail.props";

const injectProductThumbnailProps = createInjector(({}:IProductThumbnailInputProps):IProductThumbnailProps => {
    return {};
});

const connect = inject<IProductThumbnailInputProps, ProductThumbnailProps>(mergeProps(
    injectProductContextProps,
    injectProductThumbnailProps,
));
export const connectProductThumbnail = connect;

export const ProductThumbnail = withLayoutMetadata(
    overridable<IProductThumbnailInputProps>(connect(ProductThumbnailComponent)),
    {
        name: "ProductThumbnail",
        displayName: "ProductThumbnail",
        category: "Store",
        subCategory: "Product",
        description: "",
        icon,
        getSlotDisplayName: (slotName, props) => props[slotName] || slotName,
        layoutEditor: ProductThumbnailLayoutEditor,
        propEditor: ProductThumbnailPropEditor,
    }
);
