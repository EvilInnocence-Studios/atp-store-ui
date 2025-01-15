import { ICart } from "@store/lib/useCart";

export declare interface ICartProps extends ICart {
}

// What gets passed into the component from the parent as attributes
export declare interface ICartInputProps {

}

export type CartProps = ICartInputProps & ICartProps;