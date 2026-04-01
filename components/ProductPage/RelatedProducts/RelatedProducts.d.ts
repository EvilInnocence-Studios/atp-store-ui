import { IProductContextProps } from "@store/lib/context";
import { ILayoutComponent } from "@theming/lib/layout/componentRegistry";

export declare interface IRelatedProductsProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IRelatedProductsInputProps {
    className?: string;
    css?: string;
    classes?: any;
    slots?: Index<ILayoutComponent[]>;
    __layoutId?: string;
    id?: string | null;
    title?: string;
}

export type RelatedProductsProps = IRelatedProductsInputProps & IProductContextProps & IRelatedProductsProps;
