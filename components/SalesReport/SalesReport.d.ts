import { IOrder } from "@store-shared/order/types";

export declare interface ISalesReportProps {
    data: IOrder[];
    salesByDate: Record<string, IOrder[]>;
    salesByWeek: Record<string, IOrder[]>;
    salesByMonth: Record<string, IOrder[]>;
    isLoading: boolean;
    refresh: () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface ISalesReportInputProps {

}

export type SalesReportProps = ISalesReportInputProps & ISalesReportProps;