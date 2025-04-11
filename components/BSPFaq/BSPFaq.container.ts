import { createInjector, inject, mergeProps } from "unstateless";
import {BSPFaqComponent} from "./BSPFaq.component";
import {IBSPFaqInputProps, BSPFaqProps, IBSPFaqProps} from "./BSPFaq.d";

const injectBSPFaqProps = createInjector(({}:IBSPFaqInputProps):IBSPFaqProps => {
    return {};
});

const connect = inject<IBSPFaqInputProps, BSPFaqProps>(mergeProps(
    injectBSPFaqProps,
));

export const BSPFaq = connect(BSPFaqComponent);
