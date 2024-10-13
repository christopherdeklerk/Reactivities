import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default function NavBar() {
    const {activityStore} = useStore();
    return (
        // CDK20241006 Menu inverted for dark color and fixed to the top. Container used for some nice padding.
        // CDK20241006 Three Menu Items - one after the other. Reactivities, Activities and a create activity button.
        // CDK20241006 Supply the styles as an object - so an additional {} inside the style brackets.
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>                    
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}} />
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities' />
                <Menu.Item>
                    <Button onClick={() => activityStore.openForm()} positive content='Create Activity' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}