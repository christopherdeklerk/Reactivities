using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity _activity;
            public Command(Activity activity)            
            {
                _activity = activity;                
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private DataContext _context { get; }
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;                
            }
            
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                // CDK20241005 Get the Activity first, then update it. Mapper is obviously the way to go here.
                var activity = await _context.Activities.FindAsync(request._activity.Id);
                _mapper.Map(request._activity, activity); // CDK20241005 Use the profile set up in Core.MappingProfiles to set all the properties.
                await _context.SaveChangesAsync();
            }
        }
    }
}