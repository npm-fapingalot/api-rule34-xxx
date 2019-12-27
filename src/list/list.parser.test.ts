import { getHomePosts } from './list.parser';

describe('#getHomePosts', () => {
  test('Compatibility', async () => {
    const manga = await getHomePosts();

    expect(manga).toBeDefined();
    expect(manga).toHaveLength(42);
  }, 2000000);
});
