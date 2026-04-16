import { overridable } from "@core/lib/overridable";
import { injectProductContextProps } from "@store/lib/context";
import { withLayoutMetadata } from "@theming/lib/layout/componentRegistry";
import { createInjector, inject, mergeProps } from "unstateless";
import icon from './icon.svg';
import { RelatedProductsComponent } from "./RelatedProducts.component";
import { IRelatedProductsInputProps, IRelatedProductsProps, RelatedProductsProps } from "./RelatedProducts.d";
import { RelatedProductsLayoutEditor } from "./RelatedProducts.layout";
import { RelatedProductsPropEditor } from "./RelatedProducts.props";

const injectRelatedProductsProps = createInjector(({}:IRelatedProductsInputProps):IRelatedProductsProps => {
    return {};
});

const connect = inject<IRelatedProductsInputProps, RelatedProductsProps>(mergeProps(
    injectProductContextProps,
    injectRelatedProductsProps,
));
export const connectRelatedProducts = connect;

export const RelatedProducts = withLayoutMetadata(
    overridable<IRelatedProductsInputProps>(connect(RelatedProductsComponent)),
    {
        name: "RelatedProducts",
        displayName: "Related Products",
        category: "Store",
        subCategory: "Browse",
        description: "",
        icon,
        getSlotDisplayName: (slotName, props) => props[slotName] || slotName,
        layoutEditor: RelatedProductsLayoutEditor,
        propEditor: RelatedProductsPropEditor,
    }
);
