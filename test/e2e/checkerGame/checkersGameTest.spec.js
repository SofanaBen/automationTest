const { test, expect } = require('@playwright/test');
const CheckersGamePage = require('./checkersGamePage');

test.describe("Checkers Game Automation", () => {
  let game;
  let page;

  test.beforeAll(async ({ browser }) => {
    // Create a context manually
    const context = await browser.newContext();
        
    // Create a page from the context
    page = await context.newPage();
    game = new CheckersGamePage(page);
    await game.navigate();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test("should load the site", async () => {
    const siteUp = await game.isSiteUp();
    expect(siteUp).toBeTruthy();
  });

  test("should make five legal moves as orange and one to eliminate the blue", async () => {
    await game.makeMove('space62', 'space73');
    await game.makeMove('space71', 'space62');
    await game.makeMove('space42', 'space53');
    // The blue piece will be taken
    await game.makeMove('space53', 'space35');
    await page.waitForTimeout(4000);
  });

  test("should restart the game", async () => {
    await game.restartGame();
    const restarted = await game.isGameRestarted();
    expect(restarted).toBeTruthy();
});

});
