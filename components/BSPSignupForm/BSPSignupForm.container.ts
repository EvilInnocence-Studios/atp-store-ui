import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";
import { useLoggedInUser } from "@uac/lib/login/services";
import { useState } from "react";
import { all } from "ts-functional";
import { createInjector, inject, mergeProps } from "unstateless";
import { BSPSignupFormComponent } from "./BSPSignupForm.component";
import { BSPSignupFormProps, IBSPSignupFormInputProps, IBSPSignupFormProps } from "./BSPSignupForm.d";

const injectBSPSignupFormProps = createInjector(({}:IBSPSignupFormInputProps):IBSPSignupFormProps => {
    const [selectedOption, setSelectedOption] = useState<number>(0);
    const [user, _setUser, refresh] = useLoggedInUser();
    
    const createSubscription = (option:any) => (data:any, actions:any) => {
        console.log("Create subscription", data, actions);
        return actions.subscription.create({
            plan_id: option.planId
        });
    }

    const onApprove = (data:any, actions:any) => {
        console.log("One approve", data, actions);
        return services().user.subscribe(user.user.id, data.subscriptionID)
            .then(all(flash.success("Subscription created"), refresh));
    }

    return {selectedOption, setSelectedOption, userId: user.user.id, createSubscription, onApprove};
});

const connect = inject<IBSPSignupFormInputProps, BSPSignupFormProps>(mergeProps(
    injectBSPSignupFormProps,
));

export const BSPSignupForm = connect(BSPSignupFormComponent);
