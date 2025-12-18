import { getRandomGreeting, maxRecentGreetings } from "../getRandomGreeting";
describe("getRandomGreeting", () => {
    it("should return a unique greeting each time", () => {
        const greetings = new Set();
        const iterations = maxRecentGreetings * 10;
        for (let i = 0; i < iterations; i++) {
            greetings.add(getRandomGreeting());
        }
        expect(greetings.size).toBeGreaterThanOrEqual(maxRecentGreetings);
    });
});
