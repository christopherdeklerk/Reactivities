namespace Application.Core
{
    // CDK20241021 Return this exception from Middleware
    public class AppException
    {
        // CDK20241021 We'll only populate details when we are in developer mode. So we save production the details.
        public AppException(int statusCode, string message, string details = null)
        {
            StatusCode = statusCode;
            Message = message;
            Details = details;
        }

        public int StatusCode { get; set; }        
        public string Message { get; set; }
        public string Details { get; set; }
    }
}