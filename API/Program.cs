using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CDK20240928 ADDED - You need to specify the DbContext and what Database you are using. So we are physically setting up this DefaultConnection in the appsettings.Development.json file.
builder.Services.AddDbContext<DataContext>(opt => 
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors(opt => {
    opt.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
    });
}); // CDK20241002 - Added the CORS policy to allow our app to communicate on the browser

var app = builder.Build();

// Configure the HTTP request pipeline. CDK20240927 - Middleware. We can do things with requests passing through this pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

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
