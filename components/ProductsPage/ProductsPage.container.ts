import { overridable } from "@core/lib/overridable";
import { createInjector, inject, mergeProps } from "unstateless";
import { ProductsPageComponent } from "./ProductsPage.component";
import { IProductsPageInputProps, IProductsPageProps, ProductsPageProps } from "./ProductsPage.d";

const injectProductsPageProps = createInjector(({}:IProductsPageInputProps):IProductsPageProps => {
    return {};
});

const connect = inject<IProductsPageInputProps, ProductsPageProps>(mergeProps(
    injectProductsPageProps,
));

export const ProductsPage = overridable<IProductsPageInputProps>(connect(ProductsPageComponent));
