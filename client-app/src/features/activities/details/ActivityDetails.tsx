import { Button, ButtonGroup, Card, CardContent, CardDescription, CardHeader, CardMeta, Image } from "semantic-ui-react"
import { useStore } from "../../../app/stores/store"
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";

// CDK20241006 - fluid makes the card take up all available space. Neat trick with the images.
// CDK20241006 - I'm always going to have an Activity here. This form will not display if there is no selected Activity.
export default observer (function ActivityDetails() {
    const {activityStore} = useStore();
    const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams(); // CDK20241015 - This importantly must use the same name for id as the parameter that was setup.

    // CDK20241015 - This importantly must use the same name for id as the parameter that was setup.
    useEffect(() => {        
        if (id) loadActivity(id);
    }, [id, loadActivity]);

    if (loadingInitial || !activity) return <LoadingComponent />;

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <CardContent>
                <CardHeader>{activity.title}</CardHeader>
                <CardMeta>
                    <span>{activity.date}</span>
                </CardMeta>
                <CardDescription>
                    {activity.description}
                </CardDescription>
            </CardContent>
            <CardContent extra>
                <ButtonGroup widths='2'>
                    <Button                         
                        as={Link} to={`/manage/${activity.id}`} basic color='blue' content='Edit' />
                    <Button                        
                        as={Link} to={'/activities'} basic color='grey' content='Cancel' />
                </ButtonGroup>
            </CardContent>
        </Card>
    )
});