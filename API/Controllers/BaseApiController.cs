using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // CDK20240929 We set this up specifically so we don't have to include this every time we create a Controller.
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        // CDK20241004 Create a private variable for iMediator.
        private IMediator _mediator;

        // CDK20241004 And populate it with the IMediator Service.
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
    }
}