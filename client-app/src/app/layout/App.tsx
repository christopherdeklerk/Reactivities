import { useEffect } from 'react'
import './styles.css'
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {activityStore} = useStore();  

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])    

  // CDK20241006 Container always going to give you nice padding - we need the marginTop as we are using a 'fixed' NavBar, so this overwrites some of our other display.
  // CDK20241006 On the ActivityDashboard - passing down the function and the state
  if (activityStore.loadingInitial) return <LoadingComponent content={'Loading app'} />

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>        
        <ActivityDashboard />
      </Container>
    </>
  )
}

export default observer(App);
