import cheerio from 'cheerio';
import fetch from 'node-fetch';

import * as SELECTOR from './list.selectors';
import * as URL from './list.url';
import { IPrevPost } from './list.schema';
import { sanitizeText } from '../utils.parse';

// Parsers
export const ID_REGEX = /\/(\d+(-\w+)+)\.html/i;
export const getID = ($: Cheerio): number | null =>
  URL.hrefToID(sanitizeText($.find(SELECTOR.MANGA_LINK).attr('href')));

export const getThumbnail = ($: Cheerio): string | null => sanitizeText($.find(SELECTOR.MANGA_IMG).attr('src'));

// Main parsers
export const getPostsFromCheerio = ($: CheerioStatic): IPrevPost[] => {
  return $(SELECTOR.MANGA).map((ignore, elRaw) => {
    const el = $(elRaw);

    const id = getID(el);
    if (!id) { throw new Error('Invalid id: ' + id); }

    const thumbnail = getThumbnail(el);
    if (!thumbnail) { throw new Error('Thumbnail is empty'); }

    return {
      id,
      thumbnail,
    } as IPrevPost;
  }).get();
};

export const getHomePostsHTML = (htmlSource: string): IPrevPost[] =>
  getPostsFromCheerio(cheerio.load(htmlSource));

// Different url generators
export const getHomePosts = async (page = 0): Promise<IPrevPost[]> =>
  getHomePostsHTML(await (await fetch(URL.home(page))).text());

export const searchByText = async (query: string, page = 0): Promise<IPrevPost[]> =>
  getHomePostsHTML(await (await fetch(URL.search(query, page))).text());
