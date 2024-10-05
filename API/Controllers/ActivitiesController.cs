using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {        
        // CDK20241005 Cancellation Token can get passed down from Mediatr into our Application service.
        [HttpGet] // api/activities
        public async Task<ActionResult<List<Activity>>> GetActivies(CancellationToken ct)
        {
            return await Mediator.Send(new List.Query(), ct);
        }

        [HttpGet("{id}")] // api/activities/{id}
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query(id));
        }

        // CDK20241005 Returns an HTTPResponse - no type though.
        // CDK20241005 We are not returning from our Handler - so leave the Ok() blank and do the action outside of it.
        [HttpPost] // api/activities/{id}
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            await Mediator.Send(new Create.Command(activity));
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id; // CDK20241005 Id not being set on the activity - this coming straight from the route.
            await Mediator.Send(new Edit.Command(activity));
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            await Mediator.Send(new Delete.Command(id));
            return Ok();
        }
    }
}