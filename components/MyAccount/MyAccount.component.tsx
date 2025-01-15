import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {MyAccountProps} from "./MyAccount.d";
import styles from './MyAccount.module.scss';
import { faCartShopping, faDownload, faUser } from "@fortawesome/free-solid-svg-icons";
import { Tabs } from "antd";
import { ProfileEditor } from "@uac/components/ProfileEditor";
import { UserOrderList } from "../UserOrderList";
import { UserFileList } from "../UserFileList";

export const MyAccountComponent = ({}:MyAccountProps) =>
    <div className={styles.myAccount}>
        <h1><FontAwesomeIcon icon={faUser} /> My Account</h1>
        <Tabs defaultActiveKey="1" tabPosition="left">
            <Tabs.TabPane tab={<><FontAwesomeIcon icon={faUser} /> Profile</>} key="1">
                <ProfileEditor />
            </Tabs.TabPane>
            <Tabs.TabPane tab={<><FontAwesomeIcon icon={faCartShopping} /> Orders</>} key="2">
                <UserOrderList />
            </Tabs.TabPane>
            <Tabs.TabPane tab={<><FontAwesomeIcon icon={faDownload} /> My Files</>} key="3">
                <UserFileList />
            </Tabs.TabPane>
        </Tabs>
    </div>;
