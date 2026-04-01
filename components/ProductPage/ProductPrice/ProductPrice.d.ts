import { ILayoutComponent } from "@theming/lib/layout/componentRegistry";

export declare interface IProductPriceProps {
    salePrice: number;
    isLoading: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface IProductPriceInputProps {
    className?: string;
    css?: string;
    classes?: any;
    slots?: Index<ILayoutComponent[]>;
    __layoutId?: string;
    id?: string | null;
    small?: boolean;
}

export type ProductPriceProps = IProductPriceInputProps & IProductContextProps & IProductPriceProps;
