import { Loader } from "semantic-ui-react";

interface ILoadingComponentProps {    
    content?: string;
}

// CDK20241007 - I'm not including a Dimmer here. If he does something with dimming in the future I'll add it back in.
export default function LoadingComponent({ content = "Loading..." }: ILoadingComponentProps) {
    return (
        <Loader active content={content} />
    )
}