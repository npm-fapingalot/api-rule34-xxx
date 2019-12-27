import { home, search } from './list.url';

describe('#home', () => {
  test('Usage', () => {
    expect(home(1)).toBe('https://rule34.xxx/index.php?page=post&s=list&pid=42');
  });
});

describe('#search', () => {
  test('Usage', () => {
    expect(search('ttt', 1)).toBe('https://rule34.xxx/index.php?page=post&s=list&pid=42&tags=ttt');
  });
});
