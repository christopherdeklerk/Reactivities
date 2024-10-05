using AutoMapper;
using Domain;

namespace Application.Core
{
    // CDK20241005 Create this inheriting from AutoMapper Profile
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // CDK20241005 Match the property names from one to the other.
            CreateMap<Activity, Activity>();
        }
    }
}