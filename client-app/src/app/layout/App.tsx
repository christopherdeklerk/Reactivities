import { useEffect, useState } from 'react'
import './styles.css'
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid'; // CDK20241006 - This doesn't have a typescript definition file. Check the error and follow the recommendations.
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then(response => {
      // CDK20241007 - Nasty fix for handling DateTimes in js, but this illustrates intercepting the request and doing something with the response before passing on.
      let activities: Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
      setActivities(activities);
      setLoading(false);
    })
  }, [])

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id)!)
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  // CDK20241006 On the ActivityDashboard - passing down the function and the state. Temp function, as nothing is actually being saved to the db here. There's no persistence.
  function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        // CDK20241006 We have an id so the activity exists. Filter out of the original list and add the changed entity on to the end.
        setActivities([...activities.filter(x => x.id !== activity.id), activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      // CDK20241006 New activity, just add. Use uuid to generate a new Guid. Lots of AWESOME spread operator functionality taking place. 
      // You can't make this neater, these properties are all getting set in the promise, so are required to be set within. Setting externally doesn't work.    
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    })    
  }

  // CDK20241006 Container always going to give you nice padding - we need the marginTop as we are using a 'fixed' NavBar, so this overwrites some of our other display.
  // CDK20241006 On the ActivityDashboard - passing down the function and the state
  if (loading) return <LoadingComponent content={'Loading app'} />

  return (
    <>
      <NavBar
        openForm={handleFormOpen}
      />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  )
}

export default App
