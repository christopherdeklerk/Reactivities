import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from 'uuid';

// CDK20241006 - Clearing attribute can be used to clear any previous floats and make everything look great. This fixes the buttons popping out issue.
export default observer(function ActivityForm() {
    const { activityStore } = useStore()
    const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams();
    const navigate = useNavigate()

    // CDK20241016 - When we get our activity back we will need to store it in component state. So we have the activity and a method to set it - setActivity.
    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: '',
    });
    
    // CDK20241016 - Do something when this component loads. If we have the id, the set it nicely.
    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!));
    }, [id, loadActivity]);

    function handleSubmit() {
        if (!activity.id) {
            // CDK20241016 - Setting the activity id on the front end so we don't need to receive anything back from the server and can just navigate immediately.
            activity.id = uuid();
            createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        } else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }        
    }

    // CDK20241006 - We need to track these changes in the Form Input - through the onChange handler of the form.
    // CDK20241006 - We destructure the properties we need from the event.target
    // CDK20241006 - And then essentially we set the property with the key of "name" to the "value"
    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }

    if (loadingInitial) return <LoadingComponent content="Loading activity..." />

    // CDK20241006 - I just had the onChange handler at the form level. Didn't see the need to put it on individual inputs. Works fine.
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off' onChange={handleInputChange} >
                <Form.Input placeholder='Title' value={activity.title} name='title' />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' />
                <Form.Input placeholder='Category' value={activity.category} name='category' />
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' />
                <Form.Input placeholder='City' value={activity.city} name='city' />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to={'/activities'} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
});