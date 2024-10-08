import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity"
import { useState } from "react";

interface IActivityListProps {
    activities: Activity[];
    selectActivity: (id: string) => void,
    deleteActivity: (id: string) => void,
    submitting: boolean
}

// CDK20241006 - divided just adds the nice division between the groups. Remember to add a key when you are looping.
export default function ActivityList({ activities, selectActivity, deleteActivity, submitting }: IActivityListProps) {
    const [target, setTarget] = useState('');

    // CDK20241007 - This is a great way of targetting individual UI elements. We setup the above state for the button - to give the button a name.
    // CDK20241007 - We create this function to take in the MouseEvent of the button click    
    function handleActivityDelete(e: React.MouseEvent<HTMLButtonElement>, id: string) {
        // CDK20241007 - We then set our target state to the name of the button (which we set to activity.id) and then we delete. So only that button is impacted.
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button
                                    onClick={() => selectActivity(activity.id)}
                                    floated='right' content='View' color='blue' />
                                <Button
                                    name={activity.id}
                                    onClick={(e) => handleActivityDelete(e, activity.id)}
                                    loading={submitting && target === activity.id}
                                    floated='right' content='Delete' color='red' />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}