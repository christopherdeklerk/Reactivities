import { useEffect, useState } from 'react'
import './styles.css'
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid'; // CDK20241006 - This doesn't have a typescript definition file. Check the error and follow the recommendations.

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data);
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
    activity.id
      // CDK20241006 We have an id so the activity exists. Filter out of the original list and add the changed entity on to the end.
      ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
      // CDK20241006 New activity, just add. Use uuid to generate a new Guid. Lots of AWESOME spread operator functionality taking place.
      : setActivities([...activities, {...activity, id: uuid()}]);
      setEditMode(false);
      setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter(x => x.id !== id)]);
  }

  // CDK20241006 Container always going to give you nice padding - we need the marginTop as we are using a 'fixed' NavBar, so this overwrites some of our other display.
  // CDK20241006 On the ActivityDashboard - passing down the function and the state
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
        />
      </Container>
    </>
  )
}

export default App
