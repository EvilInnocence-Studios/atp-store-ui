import { Button, Popconfirm } from "antd";
import { BSPSignupForm } from "../BSPSignupForm";
import {SubscriptionEditorProps} from "./SubscriptionEditor.d";
import styles from './SubscriptionEditor.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { hasPermission } from "@uac/components/HasPermission";
import { BSPFaq } from "../BSPFaq";

const IsSubscribed = hasPermission("product.subscription");

export const SubscriptionEditorComponent = ({cancel}:SubscriptionEditorProps) => <>
    <h1>Backstage Pass</h1>
    <IsSubscribed no>
        <BSPSignupForm onSignup={() => {}} />
    </IsSubscribed>
    <div className={styles.bspFaq}>
        <BSPFaq />
    </div>
    <IsSubscribed yes>
        <Popconfirm onConfirm={cancel} title="Are you sure you want to cancel your Backstage Pass subscription?">
            <Button type="primary" danger>
                <FontAwesomeIcon icon={faTrash} /> Cancel Backstage Pass Subscription
            </Button>
        </Popconfirm>
    </IsSubscribed>
</>;
