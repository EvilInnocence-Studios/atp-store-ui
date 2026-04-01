import { IProductContextProps } from "@store/lib/context";
import { ILayoutComponent } from "@theming/lib/layout/componentRegistry";

export declare interface IProductNameProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IProductNameInputProps {
    className?: string;
    css?: string;
    classes?: any;
    slots?: Index<ILayoutComponent[]>;
    __layoutId?: string;
    id?: string | null;
}

export type ProductNameProps = IProductNameInputProps & IProductContextProps & IProductNameProps;
