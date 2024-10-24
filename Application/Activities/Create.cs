using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        // CDK20241005 Commands do not return anything - so there is no return type parameter
        // CDK20241021 Updated to Return a Result of Unit - so still basically not returning anything.
        public class Command : IRequest<Result<Unit>>
        {        
            public Activity _activity;   

            public Command(Activity activity)
            {
                _activity = activity;
            }
        }

        // CDK20241020 Validation added through FluentValidator
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x._activity).SetValidator(new ActivityValidator());
            }
        }

        // CDK20241005 Important this is a RequestHandler for the defined Command - which has an Activity on it.
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }            

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // CDK20241005 Not accessing the database at this point - so the method doesn't need to be async. Tracking the Add in memory.
                _context.Activities.Add(request._activity);
                var result = await _context.SaveChangesAsync() > 0;  

                // CDK20241021 SaveChangesAsync returns a number of state entities written to the database, so if this is more than 0 we have success.
                if(!result) return Result<Unit>.Failure("Failed to create activity");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}