class DeckOfCardsAPI {
    async drawCards(deckId, count) {
        const response = await this.page.goto(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`);
        const data = await response.json();
        return data.cards;
    }
    
    async getNewDeck() {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/');
        return await response.json();
    }

    async shuffleDeck(deckId) {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
        return await response.json();
    }

    async dealCards(deckId, count) {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`);
        return await response.json();
    }

    hasBlackjack(cards) {
        const values = cards.map(card => card.value);
        return values.includes('ACE') && (values.includes('10') || values.includes('JACK') || values.includes('QUEEN') || values.includes('KING'));
    }
}

module.exports = DeckOfCardsAPI;
