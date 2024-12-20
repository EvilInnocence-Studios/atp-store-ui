import { faShirt, faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { Index } from "ts-functional/dist/types";

export const storeMenus:Index<ItemType<MenuItemType>[]> = {
    admin: [{
        key: "store",
        label: "Store",
        icon: <FontAwesomeIcon icon={faStore} />,
        children: [{
            key: "products",
            label: "Products",
            icon: <FontAwesomeIcon icon={faShirt} />,
        }],
    }],
};
