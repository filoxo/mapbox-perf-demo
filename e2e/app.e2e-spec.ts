import { MapboxPerfDemosPage } from './app.po';

describe('mapbox-perf-demos App', () => {
  let page: MapboxPerfDemosPage;

  beforeEach(() => {
    page = new MapboxPerfDemosPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
