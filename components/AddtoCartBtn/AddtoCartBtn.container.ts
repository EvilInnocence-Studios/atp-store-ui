import { createInjector, inject, mergeProps } from "unstateless";
import {AddtoCartBtnComponent} from "./AddtoCartBtn.component";
import {IAddtoCartBtnInputProps, AddtoCartBtnProps, IAddtoCartBtnProps} from "./AddtoCartBtn.d";

const injectAddtoCartBtnProps = createInjector(({}:IAddtoCartBtnInputProps):IAddtoCartBtnProps => {
    return {
        addToCart: () => {},
        download: () => {},
        subscribe: () => {},
    };
});

const connect = inject<IAddtoCartBtnInputProps, AddtoCartBtnProps>(mergeProps(
    injectAddtoCartBtnProps,
));

export const AddtoCartBtn = connect(AddtoCartBtnComponent);
