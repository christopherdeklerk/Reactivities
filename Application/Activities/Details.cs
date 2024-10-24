using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        // CDK20241020 Now returning a Result of type Activity
        public class Query : IRequest<Result<Activity>>
        {
            public Guid Id { get; set; }

            public Query(Guid id)
            {
                this.Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, Result<Activity>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                this._context = context;
            }

            // CDK20241020 Rather return a Result object that will either contain an Activity, or contain Null, 
            // CDK20241020 so that we can contain the error handling logic in the object themselves rather than the controller.
            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);
                
                return Result<Activity>.Success(activity);
            }
        }
    }
}