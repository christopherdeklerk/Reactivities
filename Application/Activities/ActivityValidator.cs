using Domain;
using FluentValidation;

namespace Application.Activities
{
    // CDK20241020 - Setup neatly to provide validation on the Activity type automatically.
    // So all we have to do is validate the Activity on our objects by setting the validator.
    public class ActivityValidator : AbstractValidator<Activity>
    {
        public ActivityValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.Category).NotEmpty();
            RuleFor(x => x.City).NotEmpty();
            RuleFor(x => x.Venue).NotEmpty();
        }
    }
}