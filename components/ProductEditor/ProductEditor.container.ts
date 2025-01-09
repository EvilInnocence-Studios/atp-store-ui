import { services } from "@core/lib/api";
import { IProduct } from "@store-shared/product/types";
import { createInjector, inject, mergeProps } from "unstateless";
import { ProductEditorComponent } from "./ProductEditor.component";
import { IProductEditorInputProps, IProductEditorProps, ProductEditorProps } from "./ProductEditor.d";
import { useUpdater } from "@core/lib/useUpdater";

const injectProductEditorProps = createInjector(({productId}:IProductEditorInputProps):IProductEditorProps => {
    const updater = useUpdater<IProduct>(
        "product",
        productId,
        {} as IProduct,
        services().product.get,
        services().product.update,
        "manual"
    );

    return {product:updater.history.entity, ...updater};
});

const connect = inject<IProductEditorInputProps, ProductEditorProps>(mergeProps(
    injectProductEditorProps,
));

export const ProductEditor = connect(ProductEditorComponent);
