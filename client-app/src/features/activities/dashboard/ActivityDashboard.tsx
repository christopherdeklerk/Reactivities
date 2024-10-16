import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useEffect } from "react";

export default observer(function ActivityDashboard() {
    const { activityStore } = useStore();
    const { loadActivities, activityRegistry } = activityStore

    // CDK20241015 - Only load this when we navigate to the activities route - this is moved due to the routing, so we don't waste a call loading the Home Page.
    useEffect(() => {
        // CDK20241016 - Not the best check, as this can reset the activityRegistry based on where the page is refreshed.
        if (activityRegistry.size <= 1) loadActivities();
    }, [loadActivities, activityRegistry.size])

    // CDK20241006 Container always going to give you nice padding - we need the marginTop as we are using a 'fixed' NavBar, so this overwrites some of our other display.
    // CDK20241006 On the ActivityDashboard - passing down the function and the state
    if (activityStore.loadingInitial) return <LoadingComponent content={'Loading app'} />

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Activity Filters</h2>
            </Grid.Column>
        </Grid>
    );
});