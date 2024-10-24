using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<List<Activity>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Activity>>>
        {
            private readonly DataContext _context;
            private readonly ILogger<List> _logger;

            public Handler(DataContext context, ILogger<List> logger)
            {
                _logger = logger;
                _context = context;
            }

            // CDK20241005 Cancellation Token allows us to cancel a request if it's no longer needed.
            public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {
                try
                {
                    for (var i = 0; i < 10; i++)
                    {
                        cancellationToken.ThrowIfCancellationRequested();
                        await Task.Delay(0, cancellationToken); // CDK20241005 If you want to see cancellation in action, set this to 1000 and cancel the slow running query.
                        _logger.LogInformation($"Task {i} has completed");
                    }
                }
                catch (Exception)
                {
                    _logger.LogInformation("Task was cancelled");
                    throw;
                }
                return Result<List<Activity>>.Success(await _context.Activities.ToListAsync());
            }
        }
    }
}