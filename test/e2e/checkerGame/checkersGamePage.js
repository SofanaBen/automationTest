class CheckersGamePage {
    constructor(page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('https://www.gamesforthebrain.com/game/checkers/');
    }

    async isSiteUp() {
        const header = await this.page.$('h1');
        const headerText = await header.innerText();
        return headerText === 'Checkers';
    }

    async makeMove(from, to) {
        await this.page.click(`img[name="${from}"]`);
        await this.page.click(`img[name="${to}"]`);
    }

    async restartGame() {
        await this.page.click('a[href="./"]');
    }

    async isGameRestarted() {
        const firstOrangePiece = await this.page.$('img[name="space62"]');
        const srcAttribute = await firstOrangePiece.getAttribute('src');
        return srcAttribute === "you1.gif";
    }
    
}

module.exports = CheckersGamePage;
