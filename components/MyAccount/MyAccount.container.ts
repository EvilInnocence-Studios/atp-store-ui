import { createInjector, inject, mergeProps } from "unstateless";
import {MyAccountComponent} from "./MyAccount.component";
import {IMyAccountInputProps, MyAccountProps, IMyAccountProps} from "./MyAccount.d";

const injectMyAccountProps = createInjector(({}:IMyAccountInputProps):IMyAccountProps => {
    return {};
});

const connect = inject<IMyAccountInputProps, MyAccountProps>(mergeProps(
    injectMyAccountProps,
));

export const MyAccount = connect(MyAccountComponent);
