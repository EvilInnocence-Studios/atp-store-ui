import { overridable } from "@core/lib/overridable";
import { createInjector, inject, mergeProps } from "unstateless";
import { ProductTagEditorComponent } from "./ProductTagEditor.component";
import { IProductTagEditorInputProps, IProductTagEditorProps, ProductTagEditorProps } from "./ProductTagEditor.d";

const injectProductTagEditorProps = createInjector(({}:IProductTagEditorInputProps):IProductTagEditorProps => {
    return {};
});

const connect = inject<IProductTagEditorInputProps, ProductTagEditorProps>(mergeProps(
    injectProductTagEditorProps,
));

export const ProductTagEditor = overridable<IProductTagEditorInputProps>(connect(ProductTagEditorComponent));
