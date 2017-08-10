import { KeepPage } from './app.po';

describe('keep App', function() {
  let page: KeepPage;

  beforeEach(() => {
    page = new KeepPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
