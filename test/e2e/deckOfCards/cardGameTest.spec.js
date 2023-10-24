const { test, expect } = require('@playwright/test');
const DeckOfCardsAPI = require('./DeckOfCardsAPI');

test.describe("Card Game Automation", () => {
    const api = new DeckOfCardsAPI();

    test("should check for blackjack for two players", async () => {
        // Step 1 & 2: Navigate and confirm site is up
        const deck = await api.getNewDeck();
        expect(deck.success).toBeTruthy();

        // Step 3 & 4: Get new deck and shuffle
        const shuffledDeck = await api.shuffleDeck(deck.deck_id);
        expect(shuffledDeck.success).toBeTruthy();

        // Step 5: Deal three cards to each player
        const player1Cards = await api.dealCards(deck.deck_id, 3);
        const player2Cards = await api.dealCards(deck.deck_id, 3);

        // Step 6 & 7: Check for blackjack
        const player1HasBlackjack = api.hasBlackjack(player1Cards.cards);
        const player2HasBlackjack = api.hasBlackjack(player2Cards.cards);
        
        if (player1HasBlackjack) {
            console.log("Player 1 has blackjack!");
        }
        if (player2HasBlackjack) {
            console.log("Player 2 has blackjack!");
        }
        
        if (!player1HasBlackjack && !player2HasBlackjack) {
            const player1CardCodes = player1Cards ? player1Cards.map(card => card.code).join(', ') : 'No cards fetched';
            const player2CardCodes = player2Cards ? player2Cards.map(card => card.code).join(', ') : 'No cards fetched';
            console.log(`Neither player has blackjack. Player 1 cards: ${player1CardCodes}. Player 2 cards: ${player2CardCodes}.`);
        }
        
        
        
    });
});
