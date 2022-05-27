describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });
  afterEach(async () => {
    await device.takeScreenshot('first');
  });

  it('should have welcome screen', async () => {
    await expect(element(by.text('Read the docs to discover what to do next:'))).toBeVisible();
    await expect(element(by.text('help'))).toBeVisible();
  });
});
