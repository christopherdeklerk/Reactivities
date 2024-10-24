using System.Net;
using System.Text.Json;
using Application.Core;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;
        
        // CDK20241021 RequestDelegate is something that can process HTTP Requests
        // CDK20241021 Logger to log the results and HostEnvironment so we can check what environment we are running in.
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;            
        }

        // CDK20241021 This has to be called InvokeAsync
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                // CDK20241021 Pass the request onto the next piece of middleware. The job is to catch Exceptions, which is why we have the catch block.
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json"; // CDK20241021 We're not in the context of an api controller here, so this must be specified. Api Controllers default to this.
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var response = _env.IsDevelopment()                
                    ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                    : new AppException(context.Response.StatusCode, "Internal Server Error");

                var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

                var json = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(json);
            }
        }
    }
}