import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {MyAccountProps} from "./MyAccount.d";
import styles from './MyAccount.module.scss';
import { faCartShopping, faDownload, faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import { Tabs } from "antd";
import { ProfileEditor } from "@uac/components/ProfileEditor";
import { UserOrderList } from "../UserOrderList";
import { UserFileList } from "../UserFileList";
import { UserWishlist } from "../UserWishlist";

export const MyAccountComponent = ({tab, changeTab}:MyAccountProps) =>
    <div className={styles.myAccount}>
        <h1><FontAwesomeIcon icon={faUser} /> My Account</h1>
        <Tabs defaultActiveKey={tab} tabPosition="left" onChange={changeTab}>
            <Tabs.TabPane tab={<><FontAwesomeIcon icon={faUser} /> Profile</>} key="profile">
                <ProfileEditor title="My Profile" />
            </Tabs.TabPane>
            <Tabs.TabPane tab={<><FontAwesomeIcon icon={faCartShopping} /> Orders</>} key="orders">
                <UserOrderList />
            </Tabs.TabPane>
            <Tabs.TabPane tab={<><FontAwesomeIcon icon={faHeart} /> My Wishlist</>} key="wishlist">
                <UserWishlist />
            </Tabs.TabPane>
            <Tabs.TabPane tab={<><FontAwesomeIcon icon={faDownload} /> My Files</>} key="files">
                <UserFileList />
            </Tabs.TabPane>
        </Tabs>
    </div>;
