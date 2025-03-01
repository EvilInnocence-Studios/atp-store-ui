import { ISubscriptionPlan } from "@core/lib/types";
import { Setter } from "unstateless";

export declare interface IBSPSignupFormProps {
    selectedOption: number;
    setSelectedOption: Setter<number>;
    userId: string;
    createSubscription: (plan:ISubscriptionPlan) => PayPalButtonCreateSubscription;
    onApprove: (data: any, actions:any) => Promise<void>;
}

// What gets passed into the component from the parent as attributes
export declare interface IBSPSignupFormInputProps {
    onSignup?: () => void;
}

export declare interface IPayPalSubscriptionApprove {
    subscriptionID: string;
    paymentSource: string;
    orderID: string;
    facilitatorAccessToken: string;
}

export type BSPSignupFormProps = IBSPSignupFormInputProps & IBSPSignupFormProps;