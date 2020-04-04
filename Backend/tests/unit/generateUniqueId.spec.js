const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
    it('Isso gera um id unico', () => {

        const id = generateUniqueId();

        expect(id).toHaveLength(8);
    })
});