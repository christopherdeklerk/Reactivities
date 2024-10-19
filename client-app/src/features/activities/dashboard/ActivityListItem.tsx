import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { Link } from "react-router-dom";

interface IActivityListItemProps {
    activity: Activity
}

export default function ActivityListItem({ activity }: IActivityListItemProps) {
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        {/* CDK20241019 - Image representing the user */}
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            {/* CDK20241019 - Link to the actual Activity */}
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                            <Item.Description>
                                Hosted by Jerry
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {activity.date}
                    <Icon name='marker' /> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                Attendess will appear here...
            </Segment>
            {/* CDK20241019 - Clearing clears any previous floats - pretty useful for design issues */}
            <Segment clearing>
                <span>{activity.description}</span>
                <Button as={Link} to={`/activities/${activity.id}`} color='teal' floated='right' content='View' />
            </Segment>
        </Segment.Group>
    )
}