import { Button, ButtonGroup, Card, CardContent, CardDescription, CardHeader, CardMeta, Image } from "semantic-ui-react"
import { useStore } from "../../../app/stores/store"

// CDK20241006 - fluid makes the card take up all available space. Neat trick with the images.
// CDK20241006 - I'm always going to have an Activity here. This form will not display if there is no selected Activity.
export default function ActivityDetails() {
    const {activityStore} = useStore();
    const {selectedActivity: activity, openForm, cancelSelectedActivity} = activityStore;

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity!.category}.jpg`} />
            <CardContent>
                <CardHeader>{activity!.title}</CardHeader>
                <CardMeta>
                    <span>{activity!.date}</span>
                </CardMeta>
                <CardDescription>
                    {activity!.description}
                </CardDescription>
            </CardContent>
            <CardContent extra>
                <ButtonGroup widths='2'>
                    <Button 
                        onClick={() => openForm(activity!.id)}
                        basic color='blue' content='Edit' />
                    <Button
                        onClick={cancelSelectedActivity}
                        basic color='grey' content='Cancel' />
                </ButtonGroup>
            </CardContent>
        </Card>
    )
}