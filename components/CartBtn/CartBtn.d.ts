export declare interface ICartBtnProps {
    count: number;
}

// What gets passed into the component from the parent as attributes
export declare interface ICartBtnInputProps {
    classes?: any;
}

export type CartBtnProps = ICartBtnInputProps & ICartBtnProps;