// CDK20241023 - Generic type setup for a server error
export interface ServerError {
    statusCode: number;
    message: string;
    details: string;
}