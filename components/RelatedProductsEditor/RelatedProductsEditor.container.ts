import { createInjector, inject, mergeProps } from "unstateless";
import {RelatedProductsEditorComponent} from "./RelatedProductsEditor.component";
import {IRelatedProductsEditorInputProps, RelatedProductsEditorProps, IRelatedProductsEditorProps} from "./RelatedProductsEditor.d";

const injectRelatedProductsEditorProps = createInjector(({}:IRelatedProductsEditorInputProps):IRelatedProductsEditorProps => {
    return {};
});

const connect = inject<IRelatedProductsEditorInputProps, RelatedProductsEditorProps>(mergeProps(
    injectRelatedProductsEditorProps,
));

export const RelatedProductsEditor = connect(RelatedProductsEditorComponent);
