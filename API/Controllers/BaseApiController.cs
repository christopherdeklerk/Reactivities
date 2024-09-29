using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // CDK20240929 We set this up specifically so we don't have to include this every time we create a Controller.
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        
    }
}