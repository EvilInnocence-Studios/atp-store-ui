import { Button, Popconfirm } from "antd";
import { BSPSignupForm } from "../BSPSignupForm";
import {SubscriptionEditorProps} from "./SubscriptionEditor.d";
// import styles from './SubscriptionEditor.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const SubscriptionEditorComponent = ({user, cancel}:SubscriptionEditorProps) => <>
    <h1>Backstage Pass</h1>
    {user.subscriptionId && <>
        <Popconfirm onConfirm={cancel} title="Are you sure you want to cancel your Backstage Pass subscription?">
            <Button type="primary" danger>
                <FontAwesomeIcon icon={faTrash} /> Cancel Backstage Pass Subscription
            </Button>
        </Popconfirm>
    </>}
    {!user.subscriptionId && 
        <BSPSignupForm onSignup={() => {}} />
    }
</>;
