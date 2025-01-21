import { ICart } from "@store/lib/useCart";

export declare interface ICartProps extends ICart {
    userId: number;
    createOrder: (_data:any, actions:any) => Promise<string>;
    onApprove: (_data:any, actions:any) => Promise<void>;
}

// What gets passed into the component from the parent as attributes
export declare interface ICartInputProps {

}

export type CartProps = ICartInputProps & ICartProps;