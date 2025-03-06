import { config } from "@config";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Button } from "antd";
import clsx from "clsx";
import { BSPSignupFormProps } from "./BSPSignupForm.d";
import styles from './BSPSignupForm.module.scss';
import { LoggedIn } from "@uac/components/LoggedIn";
import { LoginForm } from "@uac/components/LoginForm";

export const BSPSignupFormComponent = ({selectedOption, setSelectedOption, createSubscription, onApprove}:BSPSignupFormProps) => <>
    <LoggedIn yes >
        <div className={styles.subscriptionOptions}>
            <h2>Choose your Plan</h2>
            <div className={styles.optionList}>
                {config().paypal.plans.map((option, i) =>
                    <div key={i} className={styles.subscriptionOption}>
                        <div className={clsx([styles.optionDetails, (selectedOption === i) && styles.selected])}>
                            <Button type={selectedOption === i ? "primary" : "default"} onClick={() => setSelectedOption(i)}>
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
    </LoggedIn>
    <LoggedIn no>
        <div className={styles.loginForm}>
            <h2>Login to Subscribe</h2>
            <LoginForm inline />
        </div>
    </LoggedIn>
</>;
