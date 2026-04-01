import { IProductContextProps } from "@store/lib/context";
import { ILayoutComponent } from "@theming/lib/layout/componentRegistry";

export declare interface ISubProductsProps {

}

// What gets passed into the component from the parent as attributes
export declare interface ISubProductsInputProps {
    className?: string;
    css?: string;
    classes?: any;
    slots?: Index<ILayoutComponent[]>;
    __layoutId?: string;
    id?: string | null;
    title?: string;
}

export type SubProductsProps = ISubProductsInputProps & IProductContextProps & ISubProductsProps;
