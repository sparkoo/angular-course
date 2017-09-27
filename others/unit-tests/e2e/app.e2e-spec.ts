import { UnitTestsPage } from './app.po';

describe('unit-tests App', () => {
  let page: UnitTestsPage;

  beforeEach(() => {
    page = new UnitTestsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
