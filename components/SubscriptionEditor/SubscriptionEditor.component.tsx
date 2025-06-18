import { Alert, Button, Popconfirm } from "antd";
import { SignUpForm } from "@subscription/components/SignUpForm";
import {SubscriptionEditorProps} from "./SubscriptionEditor.d";
import styles from './SubscriptionEditor.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { hasPermission } from "@uac/components/HasPermission";
// import { BSPFaq } from "@public/components/BSPFaq";

const IsSubscribed = hasPermission("product.subscription");

export const SubscriptionEditorComponent = ({cancel}:SubscriptionEditorProps) => <div className={styles.bspEditor}>
    <h1>Backstage Pass</h1>
    <IsSubscribed no>
        <SignUpForm onSignup={() => {}} />
    </IsSubscribed>
    <IsSubscribed yes>
        <Alert message="You are currently subscribed to our Backstage Pass subscription." />
        <br/>
    </IsSubscribed>
    <div className={styles.bspFaq}>
        {/* <BSPFaq />*/}
    </div>
    <br/>
    <IsSubscribed yes>
        <div className={styles.bspCancel}>
            <Popconfirm
                onConfirm={cancel}
                title="Are you sure you want to cancel your Backstage Pass subscription?"
                cancelText="Stay subscribed"
                okText="Cancel subscription"
            >
                <Button type="primary">
                    <FontAwesomeIcon icon={faTrash} /> Cancel Backstage Pass Subscription
                </Button>
            </Popconfirm>
        </div>
    </IsSubscribed>
</div>;
