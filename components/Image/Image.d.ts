export declare interface IImageProps {
    image: IProductMedia | null;
    isLoading: boolean;
    imgHost: string;
}

// What gets passed into the component from the parent as attributes
export declare interface IImageInputProps {
    productId:string;
    imageId:string | null;
}

export type ImageProps = IImageInputProps & IImageProps;