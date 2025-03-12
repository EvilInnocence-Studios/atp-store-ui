import { useProductList } from "@store/lib/useProductList";
import { createInjector, inject, mergeProps } from "unstateless";
import { BackstagePassComponent } from "./BackstagePass.component";
import { BackstagePassProps, IBackstagePassInputProps, IBackstagePassProps } from "./BackstagePass.d";

const injectBackstagePassProps = createInjector(({}:IBackstagePassInputProps):IBackstagePassProps => {
    const {products} = useProductList();

    const threshold = 25;
    const count = Math.floor(products.filter(product => product.subscriptionOnly && product.enabled).length / threshold) * threshold;
    
    return {count};
});

const connect = inject<IBackstagePassInputProps, BackstagePassProps>(mergeProps(
    injectBackstagePassProps,
));

export const BackstagePass = connect(BackstagePassComponent);
