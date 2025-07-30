import { faCartShopping, faDownload, faHeart } from "@fortawesome/free-solid-svg-icons";
import { UserFileList } from "@store/components/UserFileList";
import { UserOrderList } from "@store/components/UserOrderList";
import { UserWishlist } from "@store/components/UserWishlist";
import { uacPlugins } from "@uac/lib/plugin/slots";

export const registerMyAccountTabPlugins = () => {
    uacPlugins.myAccount.tabs.register({
        key: "orders",
        title: "My Orders",
        icon: faCartShopping,
        priority: 800,
        component: UserOrderList,
    });

    uacPlugins.myAccount.tabs.register({
        key: "wishlist",
        title: "Wishlist",
        icon: faHeart,
        priority: 700,
        component: UserWishlist,
    });
    
    uacPlugins.myAccount.tabs.register({
        key: "files",
        title: "My Files",
        icon: faDownload,
        priority: 600,
        component: UserFileList,
    });
}
