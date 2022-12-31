/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { PageableObject } from './pageableObject';
import { CommentDTO } from './commentDTO';
import { Sort } from './sort';


export interface PageCommentDTO { 
    totalPages?: number;
    totalElements?: number;
    size?: number;
    content?: Array<CommentDTO>;
    number?: number;
    sort?: Sort;
    first?: boolean;
    last?: boolean;
    numberOfElements?: number;
    pageable?: PageableObject;
    empty?: boolean;
}
