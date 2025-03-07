import { createInjector, inject, mergeProps } from "unstateless";
import { NewProductsComponent } from "./NewProducts.component";
import { INewProductsInputProps, INewProductsProps, NewProductsProps } from "./NewProducts.d";

const injectNewProductsProps = createInjector(({}:INewProductsInputProps):INewProductsProps => {
    return {};
});

const connect = inject<INewProductsInputProps, NewProductsProps>(mergeProps(
    injectNewProductsProps,
));

export const NewProducts = connect(NewProductsComponent);
