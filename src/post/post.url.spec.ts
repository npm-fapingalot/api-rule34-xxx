import { post } from './post.url';

describe('#post', () => {
  test('Usage', () => {
    expect(post(3211538)).toBe('https://rule34.xxx/index.php?page=post&s=view&id=3211538');
  });
});
