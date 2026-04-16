import { overridable } from "@core/lib/overridable";
import { injectProductContextProps } from "@store/lib/context";
import { withLayoutMetadata } from "@theming/lib/layout/componentRegistry";
import { createInjector, inject, mergeProps } from "unstateless";
import icon from './icon.svg';
import { ProductNameComponent } from "./ProductName.component";
import { IProductNameInputProps, IProductNameProps, ProductNameProps } from "./ProductName.d";
import { ProductNameLayoutEditor } from "./ProductName.layout";
import { ProductNamePropEditor } from "./ProductName.props";

const injectProductNameProps = createInjector(({}:IProductNameInputProps):IProductNameProps => {
    return {};
});

const connect = inject<IProductNameInputProps, ProductNameProps>(mergeProps(
    injectProductContextProps,
    injectProductNameProps,
));
export const connectProductName = connect;

export const ProductName = withLayoutMetadata(
    overridable<IProductNameInputProps>(connect(ProductNameComponent)),
    {
        name: "ProductName",
        displayName: "Product Name",
        category: "Store",
        subCategory: "Product",
        description: "",
        icon,
        getSlotDisplayName: (slotName, props) => props[slotName] || slotName,
        layoutEditor: ProductNameLayoutEditor,
        propEditor: ProductNamePropEditor,
    }
);
