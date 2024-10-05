using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        // CDK20241005 Commands do not return anything - so there is no return type parameter
        public class Command : IRequest
        {        
            public Activity _activity;   

            public Command(Activity activity)
            {
                _activity = activity;
            }
        }

        // CDK20241005 Important this is a RequestHandler for the defined Command - which has an Activity on it.
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }            

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                // CDK20241005 Not accessing the database at this point - so the method doesn't need to be async. Tracking the Add in memory.
                _context.Activities.Add(request._activity);
                await _context.SaveChangesAsync();                
            }
        }
    }
}