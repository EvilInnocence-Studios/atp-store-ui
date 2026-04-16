import { overridable } from "@core/lib/overridable";
import { injectProductContextProps } from "@store/lib/context";
import { withLayoutMetadata } from "@theming/lib/layout/componentRegistry";
import { createInjector, inject, mergeProps } from "unstateless";
import icon from './icon.svg';
import { SubProductsComponent } from "./SubProducts.component";
import { ISubProductsInputProps, ISubProductsProps, SubProductsProps } from "./SubProducts.d";
import { SubProductsLayoutEditor } from "./SubProducts.layout";
import { SubProductsPropEditor } from "./SubProducts.props";

const injectSubProductsProps = createInjector(({}:ISubProductsInputProps):ISubProductsProps => {
    return {};
});

const connect = inject<ISubProductsInputProps, SubProductsProps>(mergeProps(
    injectProductContextProps,
    injectSubProductsProps,
));
export const connectSubProducts = connect;

export const SubProducts = withLayoutMetadata(
    overridable<ISubProductsInputProps>(connect(SubProductsComponent)),
    {
        name: "SubProducts",
        displayName: "Sub Products",
        category: "Store",
        subCategory: "Browse",
        description: "",
        icon,
        getSlotDisplayName: (slotName, props) => props[slotName] || slotName,
        layoutEditor: SubProductsLayoutEditor,
        propEditor: SubProductsPropEditor,
    }
);
