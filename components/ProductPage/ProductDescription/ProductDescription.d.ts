import { IProductContextProps } from "@store/lib/context";
import { ILayoutComponent } from "@theming/lib/layout/componentRegistry";

export declare interface IProductDescriptionProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IProductDescriptionInputProps {
    className?: string;
    css?: string;
    classes?: any;
    slots?: Index<ILayoutComponent[]>;
    __layoutId?: string;
    id?: string | null;
}

export type ProductDescriptionProps = IProductDescriptionInputProps & IProductContextProps & IProductDescriptionProps;
