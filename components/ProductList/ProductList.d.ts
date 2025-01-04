import { IProductFull } from "@store-shared/product/types";
import { Index } from "ts-functional/dist/types";

export declare interface IProductListProps {
    products: ProductList;
    isLoading: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface IProductListInputProps {

}

export type ProductListProps = IProductListInputProps & IProductListProps;

// Algorithm Types
export declare interface IPoint {
    x: number;
    y: number;
}

export declare interface IElement {
    origin: IPoint | null;
    size: IPoint;
}

export declare interface IProductElement extends IElement, IProductFull {
}

export declare interface IPlacedProduct extends IProductElement {
    origin: IPoint;
}

export declare type ProductList = IProductElement[];
export declare type PlacedProductList = IPlacedProduct[];

export declare interface ISlot extends IElement {
    origin: IPoint;
}

export declare type SlotList = ISlot[];

export declare interface IProductGroup {
    size: IPoint;
    products: ProductList;
    slots: SlotList;
}

export declare type ProductGroups = Index<IProductGroup>;