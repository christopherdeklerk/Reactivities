using System.Security.Cryptography.X509Certificates;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Activity>
        {
            public Guid Id { get; set; }

            public Query(Guid id)
            {
                this.Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.FindAsync(request.Id);
            }
        }
    }
}