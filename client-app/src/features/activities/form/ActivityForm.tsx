import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

// CDK20241006 - Clearing attribute can be used to clear any previous floats and make everything look great. This fixes the buttons popping out issue.
export default observer (function ActivityForm() {
    const {activityStore} = useStore()
    const {selectedActivity, closeForm, createActivity, updateActivity, loading} = activityStore;

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: '',
    }

    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        activity.id ? updateActivity(activity) : createActivity(activity);
    }

    // CDK20241006 - We need to track these changes in the Form Input - through the onChange handler of the form.
    // CDK20241006 - We destructure the properties we need from the event.target
    // CDK20241006 - And then essentially we set the property with the key of "name" to the "value"
    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }

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
                <Button onClick={closeForm} floated='right' type='submit' content='Cancel' />
            </Form>
        </Segment>
    )
});