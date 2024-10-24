import { Message } from "semantic-ui-react";

// CDK20241023 - Pass the errors in as an array of strings
interface ValidationErrorProps {
    errors: string[];
}

// CDK20241023 - Then display the errors
export default function ValidationError({errors}: ValidationErrorProps) {
    return (
        <Message error>
            {errors && (
                <Message.List>
                    {errors.map((err: string, i) => (
                        <Message.Item key={i}>{err}</Message.Item>
                    ))}
                </Message.List>
            )}
        </Message>
    )
}