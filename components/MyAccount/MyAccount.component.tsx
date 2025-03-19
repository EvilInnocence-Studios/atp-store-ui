import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {MyAccountProps} from "./MyAccount.d";
import styles from './MyAccount.module.scss';
import { faCartShopping, faCrown, faDownload, faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import { Tabs } from "antd";
import { ProfileEditor } from "@uac/components/ProfileEditor";
import { UserOrderList } from "../UserOrderList";
import { UserFileList } from "../UserFileList";
import { UserWishlist } from "../UserWishlist";
import { SubscriptionEditor } from "../SubscriptionEditor";
import { LoggedIn } from "@uac/components/LoggedIn";

export const MyAccountComponent = ({tab, id, changeTab}:MyAccountProps) => <>
    <LoggedIn yes>
        <div className={styles.myAccount}>
            <h1><FontAwesomeIcon icon={faUser} /> My Account</h1>
            <Tabs defaultActiveKey={tab} tabPosition="left" onChange={changeTab}>
                <Tabs.TabPane tab={<><FontAwesomeIcon icon={faUser} /> Profile</>} key="profile">
                    <ProfileEditor title="My Profile" />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<><FontAwesomeIcon icon={faCrown} /> Backstage Pass</>} key="bsp">
                    <SubscriptionEditor />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<><FontAwesomeIcon icon={faCartShopping} /> Orders</>} key="orders">
                    <UserOrderList id={id}/>
                </Tabs.TabPane>
                <Tabs.TabPane tab={<><FontAwesomeIcon icon={faHeart} /> My Wishlist</>} key="wishlist">
                    <UserWishlist />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<><FontAwesomeIcon icon={faDownload} /> My Files</>} key="files">
                    <UserFileList />
                </Tabs.TabPane>
            </Tabs>
        </div>
    </LoggedIn>
    <LoggedIn no >
        <div className={styles.myAccount}>
            <h1><FontAwesomeIcon icon={faUser} /> My Account</h1>
            <p>Please log in to view your account details.</p>
        </div>
    </LoggedIn>
</>;
