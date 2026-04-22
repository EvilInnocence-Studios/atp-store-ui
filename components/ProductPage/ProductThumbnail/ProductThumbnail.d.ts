import { IProductContextProps } from "@store/lib/context";
import { ILayoutComponent } from "@theming/lib/layout/componentRegistry";

export declare interface IProductThumbnailProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IProductThumbnailInputProps {
    className?: string;
    css?: string;
    classes?: any;
    slots?: Index<ILayoutComponent[]>;
    __layoutId?: string;
    id?: string | null;
    link?: boolean;
}

export type ProductThumbnailProps = IProductThumbnailInputProps & IProductContextProps & IProductThumbnailProps;
