using API.Extensions;
using API.Middleware;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration); // CDK20241005 - Only takes in one parameter, as we are extending on the first (the this)

var app = builder.Build();

// Configure the HTTP request pipeline. CDK20240927 - Middleware. We can do things with requests passing through this pipeline.
app.UseMiddleware<ExceptionMiddleware>();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// CDK20241021 Each Request hits each piece of middleware
app.UseCors("CorsPolicy"); // CDK20241002 - Very important to USE the CorsPolicy we specified.
app.UseAuthorization(); // CDK20240927 No Authorisation yet, so this will do nothing.
app.MapControllers(); // CDK20240927 Registers the endpoints of the Controllers

// CDK20240928 - ADDED This "using" scope states that when we are finished with this service it will be completely destroyed and cleaned up.
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context); // CDK20240928 - This is a Task, so it needs to be awaited
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}

app.Run(); // CDK20240927 http://localhost:5000 won't work in the beginning. You have to go to /swagger as that is what our MiddleWare has been specified as.
