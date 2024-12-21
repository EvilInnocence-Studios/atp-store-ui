import { createInjector, inject, mergeProps } from "unstateless";
import {ProductTagEditorComponent} from "./ProductTagEditor.component";
import {IProductTagEditorInputProps, ProductTagEditorProps, IProductTagEditorProps} from "./ProductTagEditor.d";

const injectProductTagEditorProps = createInjector(({}:IProductTagEditorInputProps):IProductTagEditorProps => {
    return {};
});

const connect = inject<IProductTagEditorInputProps, ProductTagEditorProps>(mergeProps(
    injectProductTagEditorProps,
));

export const ProductTagEditor = connect(ProductTagEditorComponent);
