import { services } from "@core/lib/api";
import { overridable } from "@core/lib/overridable";
import { useUpdater } from "@core/lib/useUpdater";
import { IProduct } from "@store-shared/product/types";
import { createInjector, inject, mergeProps } from "unstateless";
import { ProductEditorComponent } from "./ProductEditor.component";
import { IProductEditorInputProps, IProductEditorProps, ProductEditorProps } from "./ProductEditor.d";

const injectProductEditorProps = createInjector(({productId}:IProductEditorInputProps):IProductEditorProps => {
    const updater = useUpdater<IProduct>(
        "product",
        productId,
        {} as IProduct,
        services().product.get,
        services().product.update,
        "manual"
    );

    const copyUrlFromName = () => {
        if (!updater.history.entity) return;
        const name = updater.history.entity.name || "";
        const url = name.replace(/\s+/g, "-").toLowerCase();
        updater.updateString("url")(url);
    }

    return {product:updater.history.entity, ...updater, copyUrlFromName};
});

const connect = inject<IProductEditorInputProps, ProductEditorProps>(mergeProps(
    injectProductEditorProps,
));

export const ProductEditor = overridable<IProductEditorInputProps>(connect(ProductEditorComponent));
