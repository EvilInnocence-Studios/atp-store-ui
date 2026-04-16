import { overridable } from "@core/lib/overridable";
import { injectProductContextProps } from "@store/lib/context";
import { withLayoutMetadata } from "@theming/lib/layout/componentRegistry";
import { createInjector, inject, mergeProps } from "unstateless";
import icon from './icon.svg';
import { ProductTagsComponent } from "./ProductTags.component";
import { IProductTagsInputProps, IProductTagsProps, ProductTagsProps } from "./ProductTags.d";
import { ProductTagsLayoutEditor } from "./ProductTags.layout";
import { ProductTagsPropEditor } from "./ProductTags.props";

const injectProductTagsProps = createInjector(({}:IProductTagsInputProps):IProductTagsProps => {
    return {};
});

const connect = inject<IProductTagsInputProps, ProductTagsProps>(mergeProps(
    injectProductContextProps,
    injectProductTagsProps,
));
export const connectProductTags = connect;

export const ProductTags = withLayoutMetadata(
    overridable<IProductTagsInputProps>(connect(ProductTagsComponent)),
    {
        name: "ProductTags",
        displayName: "Product Tags",
        category: "Store",
        subCategory: "Product",
        description: "",
        icon,
        getSlotDisplayName: (slotName, props) => props[slotName] || slotName,
        layoutEditor: ProductTagsLayoutEditor,
        propEditor: ProductTagsPropEditor,
    }
);
