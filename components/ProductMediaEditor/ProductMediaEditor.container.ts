import { createInjector, inject, mergeProps } from "unstateless";
import {ProductMediaEditorComponent} from "./ProductMediaEditor.component";
import {IProductMediaEditorInputProps, ProductMediaEditorProps, IProductMediaEditorProps} from "./ProductMediaEditor.d";

const injectProductMediaEditorProps = createInjector(({}:IProductMediaEditorInputProps):IProductMediaEditorProps => {
    return {};
});

const connect = inject<IProductMediaEditorInputProps, ProductMediaEditorProps>(mergeProps(
    injectProductMediaEditorProps,
));

export const ProductMediaEditor = connect(ProductMediaEditorComponent);
