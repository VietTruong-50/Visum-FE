/**
 * Visum app
 * The API for the Visum music web project
 *
 * The version of the OpenAPI document: v2
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Sort } from './sort';


export interface PageableObject { 
    offset?: number;
    sort?: Sort;
    pageNumber?: number;
    pageSize?: number;
    paged?: boolean;
    unpaged?: boolean;
}

