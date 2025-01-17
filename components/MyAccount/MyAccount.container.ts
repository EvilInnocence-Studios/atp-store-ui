import { createInjector, inject, mergeProps } from "unstateless";
import {MyAccountComponent} from "./MyAccount.component";
import {IMyAccountInputProps, MyAccountProps, IMyAccountProps} from "./MyAccount.d";
import { useNavigate } from "react-router";
import { concat, pipe, prepend } from "ts-functional";

const injectMyAccountProps = createInjector(({}:IMyAccountInputProps):IMyAccountProps => {
    const navigate = useNavigate();

    const changeTab = pipe<string, string, any>(prepend('/my-account/'), navigate);
    
    return {changeTab};
});

const connect = inject<IMyAccountInputProps, MyAccountProps>(mergeProps(
    injectMyAccountProps,
));

export const MyAccount = connect(MyAccountComponent);
