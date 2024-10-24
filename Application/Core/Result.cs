namespace Application.Core
{
    // CDK20241020 Our Result object is going to be used for any of our entities - so it gets a Generic type parameter.
    public class Result<T>
    {
        public bool IsSuccess { get; set; }

        // CDK20241020 When we create a new instance of this class, we specify the type, and then Value is seen as that type.
        public T Value { get; set; }
        public string Error { get; set; }

        public static Result<T> Success(T value)
        {
            var result = new Result<T>()
            {
                IsSuccess = true,
                Value = value
            };
            return result;
        }
        public static Result<T> Failure(string error) => new Result<T> { IsSuccess = false, Error = error };
    }
}