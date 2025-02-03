import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";
import { ICartTotals } from "@store-shared/order/types";
import { memoizePromise } from "ts-functional";

export const cartServices = ({get}: IMethods) => ({
    cart: memoizePromise(
        (productIds: string[], couponCode?: string):Promise<ICartTotals> => get('cart', {productIds, couponCode}).then(getResults<ICartTotals>),
        {keyGen: ([productIds, couponCode]: [string[], string?]) => `${productIds.join(',')}-${couponCode}`},
    ),
});
