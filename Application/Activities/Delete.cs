using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {        
            public Guid _Id;

            public Command(Guid id)
            {
                _Id = id;
            }
        }

        // CDK20241005 Important this is a RequestHandler for the defined Command - which has an Id on it.
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;                
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request._Id);
                _context.Remove(activity);
                await _context.SaveChangesAsync();
            }
        }
    }
}