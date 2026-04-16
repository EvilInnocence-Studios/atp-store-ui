import { overridable } from "@core/lib/overridable";
import { injectProductContextProps } from "@store/lib/context";
import { withLayoutMetadata } from "@theming/lib/layout/componentRegistry";
import { createInjector, inject, mergeProps } from "unstateless";
import icon from './icon.svg';
import { ProductMediaPopupComponent } from "./ProductMediaPopup.component";
import { IProductMediaPopupInputProps, IProductMediaPopupProps, ProductMediaPopupProps } from "./ProductMediaPopup.d";
import { ProductMediaPopupLayoutEditor } from "./ProductMediaPopup.layout";
import { ProductMediaPopupPropEditor } from "./ProductMediaPopup.props";

const injectProductMediaPopupProps = createInjector(({}:IProductMediaPopupInputProps):IProductMediaPopupProps => {
    return {};
});

const connect = inject<IProductMediaPopupInputProps, ProductMediaPopupProps>(mergeProps(
    injectProductContextProps,
    injectProductMediaPopupProps,
));
export const connectProductMediaPopup = connect;

export const ProductMediaPopup = withLayoutMetadata(
    overridable<IProductMediaPopupInputProps>(connect(ProductMediaPopupComponent)),
    {
        name: "ProductMediaPopup",
        displayName: "ProductMediaPopup",
        category: "Store",
        subCategory: "Product",
        description: "",
        icon,
        getSlotDisplayName: (slotName, props) => props[slotName] || slotName,
        layoutEditor: ProductMediaPopupLayoutEditor,
        propEditor: ProductMediaPopupPropEditor,
    }
);
