export const home = (page = 0) => `https://rule34.xxx/index.php?page=post&s=list&pid=${page * 42}`;
export const search = (query: string, page = 0) => `https://rule34.xxx/index.php?page=post&s=list&pid=${page * 42}&tags=${query}`;


//
// Extract comic ID
//
import { regexExtract, toInt } from '../utils.parse';

export const URL_TO_ID_REGEX = /id\=(\d+)/i;
export const hrefToID = (url: string | null | undefined): number | null => toInt(regexExtract(url, URL_TO_ID_REGEX));
