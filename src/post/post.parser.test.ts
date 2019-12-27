import { getPost } from './post.parser';

describe('#getPost', () => {
  test('Compatibility', async () => {
    const manga = await getPost(3211538);

    expect(manga).toBeDefined();
    expect(manga).toHaveProperty('id', 3211538);
  }, 20000000);
});
