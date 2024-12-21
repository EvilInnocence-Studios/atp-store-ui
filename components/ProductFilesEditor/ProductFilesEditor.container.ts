import { createInjector, inject, mergeProps } from "unstateless";
import {ProductFilesEditorComponent} from "./ProductFilesEditor.component";
import {IProductFilesEditorInputProps, ProductFilesEditorProps, IProductFilesEditorProps} from "./ProductFilesEditor.d";

const injectProductFilesEditorProps = createInjector(({}:IProductFilesEditorInputProps):IProductFilesEditorProps => {
    return {};
});

const connect = inject<IProductFilesEditorInputProps, ProductFilesEditorProps>(mergeProps(
    injectProductFilesEditorProps,
));

export const ProductFilesEditor = connect(ProductFilesEditorComponent);
