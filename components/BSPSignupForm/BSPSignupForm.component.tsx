import { config } from "@config";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { hasPermission } from "@uac/components/HasPermission";
import { LoggedIn } from "@uac/components/LoggedIn";
import { LoginForm } from "@uac/components/LoginForm";
import { Alert, Button } from "antd";
import clsx from "clsx";
import { BSPSignupFormProps } from "./BSPSignupForm.d";
import styles from './BSPSignupForm.module.scss';

const IsSubscribed = hasPermission("product.subscription");

export const BSPSignupFormComponent = ({selectedOption, setSelectedOption, createSubscription, onApprove}:BSPSignupFormProps) => <>
    <LoggedIn yes>
        <IsSubscribed yes>
            <div className={styles.subscribedAlert}>
                <Alert message="You are currently subscribed to our Backstage Pass subscription." />
            </div>
        </IsSubscribed>
        <IsSubscribed no>
            <div className={styles.subscriptionOptions}>
                <h2>Choose your plan to subscribe</h2>
                <div className={styles.optionList}>
                    {config().paypal.plans.map((option, i) =>
                        <div key={i} className={styles.subscriptionOption}>
                            <div className={clsx([styles.optionDetails, (selectedOption === i) && styles.selected])} onClick={() => setSelectedOption(i)}>
                                <Button type={selectedOption === i ? "primary" : "default"}>
                                    {option.description}: ${option.price}
                                </Button>
                                <p>
                                    Renews every {option.renews}
                                    {i > 0 && <><br/>
                                        Saves {Math.round((1 - (option.price / option.period) / config().paypal.plans[0].price) * 100)}%
                                    </>}
                                </p>
                            </div>
                            {selectedOption === i && <PayPalButtons
                                style={{label: 'subscribe'}}
                                createSubscription={createSubscription(option)}
                                onApprove={onApprove}
                            />}
                        </div>
                    )}
                </div>
            </div>
        </IsSubscribed>
    </LoggedIn>
    <LoggedIn no>
        <div className={styles.loginForm}>
            <h2>Login to Subscribe</h2>
            <LoginForm inline />
        </div>
    </LoggedIn>
</>;
