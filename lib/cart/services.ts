import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";
import { ICartTotals } from "@store-shared/order/types";

export const cartServices = ({get}: IMethods) => ({
    cart: (productIds: string[], couponCode?: string) => get('cart', {productIds, couponCode}).then(getResults<ICartTotals>),
});
