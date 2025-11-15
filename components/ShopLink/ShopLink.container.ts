import { useSetting } from "@common/lib/setting/services";
import { overridable } from "@core/lib/overridable";
import { createInjector, inject, mergeProps } from "unstateless";
import { ShopLinkComponent } from "./ShopLink.component";
import { IShopLinkInputProps, IShopLinkProps, ShopLinkProps } from "./ShopLink.d";

const injectShopLinkProps = createInjector(({}:IShopLinkInputProps):IShopLinkProps => {
    const showShopLink  = useSetting("layout.header.showShopLink" ) === "true";

    return {showShopLink};
});

const connect = inject<IShopLinkInputProps, ShopLinkProps>(mergeProps(
    injectShopLinkProps,
));
export const ShopLinkPropsInjector = injectShopLinkProps;

export const ShopLink = overridable<IShopLinkInputProps>(connect(ShopLinkComponent));
export const connectShopLink = connect;