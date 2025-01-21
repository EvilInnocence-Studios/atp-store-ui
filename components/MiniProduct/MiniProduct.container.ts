import { createInjector, inject, mergeProps } from "unstateless";
import {MiniProductComponent} from "./MiniProduct.component";
import {IMiniProductInputProps, MiniProductProps, IMiniProductProps} from "./MiniProduct.d";

const injectMiniProductProps = createInjector(({}:IMiniProductInputProps):IMiniProductProps => {
    return {};
});

const connect = inject<IMiniProductInputProps, MiniProductProps>(mergeProps(
    injectMiniProductProps,
));

export const MiniProduct = connect(MiniProductComponent);
