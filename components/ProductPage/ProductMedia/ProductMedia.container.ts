import { overridable } from "@core/lib/overridable";
import { injectProductContextProps } from "@store/lib/context";
import { withLayoutMetadata } from "@theming/lib/layout/componentRegistry";
import { createInjector, inject, mergeProps } from "unstateless";
import icon from './icon.svg';
import { ProductMediaComponent } from "./ProductMedia.component";
import { IProductMediaInputProps, IProductMediaProps, ProductMediaProps } from "./ProductMedia.d";
import { ProductMediaLayoutEditor } from "./ProductMedia.layout";
import { ProductMediaPropEditor } from "./ProductMedia.props";

const injectProductMediaProps = createInjector(({}:IProductMediaInputProps):IProductMediaProps => {
    return {};
});

const connect = inject<IProductMediaInputProps, ProductMediaProps>(mergeProps(
    injectProductContextProps,
    injectProductMediaProps,
));
export const connectProductMedia = connect;

export const ProductMedia = withLayoutMetadata(
    overridable<IProductMediaInputProps>(connect(ProductMediaComponent)),
    {
        name: "ProductMedia",
        displayName: "ProductMedia",
        category: "Store",
        subCategory: "Product",
        description: "",
        icon,
        getSlotDisplayName: (slotName, props) => props[slotName] || slotName,
        layoutEditor: ProductMediaLayoutEditor,
        propEditor: ProductMediaPropEditor,
    }
);
