import { IProductMedia } from "@store-shared/product/types";
import { Setter } from "unstateless";

export declare interface IMediaSwitcherProps {
    next: () => void;
    prev: () => void;
    curImage: number;
    setCurImage: Setter<number>;
}

// What gets passed into the component from the parent as attributes
export declare interface IMediaSwitcherInputProps {
    productId:string;
    media: IProductMedia[];
    defaultMediaId:string | null;
}

export type MediaSwitcherProps = IMediaSwitcherInputProps & IMediaSwitcherProps;