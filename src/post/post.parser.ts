import cheerio from 'cheerio';
import fetch from 'node-fetch';

import * as SELECTOR from './post.selectors';
import * as URL from './post.url';
import { IPost, ITag, IPage, ITagged } from './post.schema';
import { isEmptyString, getParentText, isEmpty, regexExtract } from '../utils.parse';

export const getPages = ($: CheerioStatic): IPage[] =>
  [{
    imgURL: [
      ...$(SELECTOR.VIDEO).map((e, el) => $(el).attr('src')).get(),
      $(SELECTOR.ORIGINAL).attr('href'),
      $(SELECTOR.PREVIEW).attr('src'),
    ].filter((url) => !isEmptyString(url))
  }]


export const getTags = ($: CheerioStatic): ITagged => {
  const info: { [key: string]: ITag[] } = {};
  $(SELECTOR.TAGS_CONTAINER)
    .each((i, elRaw) => {
      const el = $(elRaw);

      const name = ((): string => {
        const clazz = el.attr('class') as string;
        if (isEmptyString(clazz)) { throw new Error('Failed to get classes'); }

        let names = clazz.split(' ')
          .map((v) => regexExtract(v, /tag-type-(\w+)/i))
          .filter((v) => !isEmptyString(v))
        if (!names[0]) { throw new Error('More that tag name found'); }
        return names[0];
      })();

      const values = el.find(SELECTOR.CONTAINER_TAG)
        .map((i2, tag) => ({
          name: getParentText($(tag)).trim(),
          href: $(tag).attr('href'),
        } as ITag)).get();

      info[name] = [...(info[name] || []), ...values];
    });

  return {
    characters: info.character || [],
    tags: info.general || [],
    artists: info.artist || [],
    copyrights: info.copyright || [],
    metadata: info.metadata || [],

  };
};

// Main parser
export const getPost = async (id: number): Promise<IPost> =>
  getPostFromHTML(await (await fetch(URL.post(id))).text(), id);

export const getPostFromHTML = (htmlSource: string, id: number): IPost =>
  getPostFromCheerio(cheerio.load(htmlSource), id);

export const getPostFromCheerio = ($: CheerioStatic, id: number): IPost => {
  const pages = getPages($);

  return {
    id,

    ...getTags($),

    pages,
  };
};
