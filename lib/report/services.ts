import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";
import { IOrder } from "@store-shared/order/types";

export const reportServices = ({get}:IMethods) => ({
    report: {
        sales: ():Promise<IOrder[]> => get('report/sales').then(getResults),
    },
});
