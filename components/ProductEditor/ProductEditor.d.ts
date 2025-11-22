import { IUpdater } from "@core/lib/useUpdater";
import { IProduct } from "@store-shared/product/types";

export declare interface IProductEditorProps extends IUpdater<IProduct> {
    product?: IProduct;
    copyUrlFromName: () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IProductEditorInputProps {
    productId: string;
    classes?: any;
}

export type ProductEditorProps = IProductEditorInputProps & IProductEditorProps;