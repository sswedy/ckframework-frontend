/**
 * key manager microservice
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * Error info
 */
export interface ErrorDto { 
    /**
     * HTTP response status code
     */
    status: number;
    /**
     * HTTP status error message
     */
    error?: string;
    /**
     * Error message
     */
    message?: string;
    /**
     * The failed request\'s path
     */
    path: string;
    /**
     * Error timestamp with timezone (RFC 3339)
     */
    timestamp: string;
}

