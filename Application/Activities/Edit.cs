using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity _activity;
            public Command(Activity activity)            
            {
                _activity = activity;                
            }
        }

        // CDK20241020 Validation added through FluentValidator. This is all configured in the ActivityValidator object.
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x._activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private DataContext _context { get; }
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;                
            }
            
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // CDK20241005 Get the Activity first, then update it. Mapper is obviously the way to go here.
                var activity = await _context.Activities.FindAsync(request._activity.Id);
                if (activity == null) return null;
                _mapper.Map(request._activity, activity); // CDK20241005 Use the profile set up in Core.MappingProfiles to set all the properties.
                
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to update activity");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}