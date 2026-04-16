import { overridable } from "@core/lib/overridable";
import { injectProductContextProps } from "@store/lib/context";
import { withLayoutMetadata } from "@theming/lib/layout/componentRegistry";
import { createInjector, inject, mergeProps } from "unstateless";
import icon from './icon.svg';
import { ProductDescriptionComponent } from "./ProductDescription.component";
import { IProductDescriptionInputProps, IProductDescriptionProps, ProductDescriptionProps } from "./ProductDescription.d";
import { ProductDescriptionLayoutEditor } from "./ProductDescription.layout";
import { ProductDescriptionPropEditor } from "./ProductDescription.props";

const injectProductDescriptionProps = createInjector(({}:IProductDescriptionInputProps):IProductDescriptionProps => {
    return {};
});

const connect = inject<IProductDescriptionInputProps, ProductDescriptionProps>(mergeProps(
    injectProductContextProps,
    injectProductDescriptionProps,
));
export const connectProductDescription = connect;

export const ProductDescription = withLayoutMetadata(
    overridable<IProductDescriptionInputProps>(connect(ProductDescriptionComponent)),
    {
        name: "ProductDescription",
        displayName: "Product Description",
        category: "Store",
        subCategory: "Product",
        description: "",
        icon,
        getSlotDisplayName: (slotName, props) => props[slotName] || slotName,
        layoutEditor: ProductDescriptionLayoutEditor,
        propEditor: ProductDescriptionPropEditor,
    }
);
