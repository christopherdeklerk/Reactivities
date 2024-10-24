using Application.Activities;
using Application.Core;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    // CDK20241005 - Just a nice service extension to clean up our progam class.
    public static class ApplicationServiceExtensions
    {
        // CDK20241005 The first parameter of an extension method is the thing that we are going to be extending
        // config gives us access to appsettings.json
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(); // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

            // CDK20240928 ADDED - You need to specify the DbContext and what Database you are using. So we are physically setting up this DefaultConnection in the appsettings.Development.json file.
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
                });
            }); // CDK20241002 - Added the CORS policy to allow our app to communicate on the browser
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(List.Handler).Assembly)); // CDK20241004 - Added Mediatr - we had to register just one Handler, so it knows where to get the rest.
            services.AddAutoMapper(typeof(MappingProfiles).Assembly); // CDK20241005 - Add AutoMapper - This will look at the assembly that contains all of our mapping profiles and add those.
            // CDK20241020 - Services required for FluentValidation
            services.AddFluentValidationAutoValidation();
            // CDK20241020 - Add Validators for the Application assembly. Services are registered and any validators are registered as well.
            services.AddValidatorsFromAssemblyContaining<Create>();

            return services;
        }
    }
}