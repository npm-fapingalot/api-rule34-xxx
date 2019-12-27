import { getID, getThumbnail } from './list.parser';

describe('#getID', () => {
  test('Working', () => {
    const $ = {
      find: ((selector: string) => ({
        attr: (attr: string) => 'index.php?page=post&s=view&id=3548288'
      }))
    } as Cheerio;

    expect(getID($)).toBe(3548288);
  });
});

describe('#getThumbnail', () => {
  test('Working', () => {
    const $ = {
      find: ((selector: string) => ({
        attr: (attr: string) => 'https://rule34.xxx/thumbnails/3158/thumbnail_56bd3afe3a306e91e1b31ac6f2d0c9b86f8327b9.jpg?3548288'
      }))
    } as Cheerio;

    expect(getThumbnail($)).toBe('https://rule34.xxx/thumbnails/3158/thumbnail_56bd3afe3a306e91e1b31ac6f2d0c9b86f8327b9.jpg?3548288');
  });
});
