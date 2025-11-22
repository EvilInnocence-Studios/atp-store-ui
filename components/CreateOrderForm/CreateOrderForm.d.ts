import { IArrayState } from "@core/lib/useArray";
import { IModal } from "@core/lib/useModal";

export declare interface ICreateOrderFormProps {
    modal: IModal;
    isLoading: boolean;
    products: IArrayState<string>;
    createOrder: () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface ICreateOrderFormInputProps {
    userId: string;
    onCreateOrder?: (orderId: string) => void;
    classes?: any;
}

export type CreateOrderFormProps = ICreateOrderFormInputProps & ICreateOrderFormProps;