export declare interface IImageProps {
    image: IProductMedia | null;
    isLoading: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface IImageInputProps {
    productId: number;
    imageId: number | null;
}

export type ImageProps = IImageInputProps & IImageProps;