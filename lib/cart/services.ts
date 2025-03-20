import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";
import { ICartTotals } from "@store-shared/order/types";
import { memoizePromise } from "ts-functional";

export const cartServices = ({get}: IMethods) => ({
    cart: memoizePromise(
        (userId:string, productIds: string[], couponCode?: string):Promise<ICartTotals> => get('cart', {userId, productIds, couponCode}).then(getResults<ICartTotals>),
        {keyGen: ([userId, productIds, couponCode]: [string, string[], string?]) => `${userId}-${productIds.join(',')}-${couponCode}`},
    ),
});
