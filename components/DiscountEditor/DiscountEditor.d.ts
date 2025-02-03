import { IDiscount } from "@store-shared/discount/types";
import { IPermission } from "@uac-shared/permissions/types";

export declare interface IDiscountEditorProps {
    discounts: IDiscount[];
    isLoading: boolean;
    permissions: IPermission[];
    update: (id:string, field:string) => (value:any) => void;
    remove: (id:string) => () => void;
    create: () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IDiscountEditorInputProps {

}

export type DiscountEditorProps = IDiscountEditorInputProps & IDiscountEditorProps;