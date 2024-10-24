using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {        
        // CDK20241005 Cancellation Token can get passed down from Mediatr into our Application service.
        [HttpGet] // api/activities
        public async Task<IActionResult> GetActivies(CancellationToken ct)
        {
            return HandleResult(await Mediator.Send(new List.Query(), ct));
        }

        // CDK20241020 - IActionResult allows us to return HttpResponses.
        [HttpGet("{id}")] // api/activities/{id}
        public async Task<IActionResult> GetActivity(Guid id)
        {            
            return HandleResult(await Mediator.Send(new Details.Query(id)));
        }

        // CDK20241005 Returns an HTTPResponse - no type though.
        // CDK20241005 We are not returning from our Handler - so leave the Ok() blank and do the action outside of it.
        [HttpPost] // api/activities/{id}
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return HandleResult(await Mediator.Send(new Create.Command(activity)));            
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id; // CDK20241005 Id not being set on the activity - this coming straight from the route.
            return HandleResult(await Mediator.Send(new Edit.Command(activity)));            
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command(id)));            
        }
    }
}