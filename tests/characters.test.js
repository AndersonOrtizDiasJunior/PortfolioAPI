const {
    addChar,
    getById,
    getByGame,
    updateChar,
    deleteChar
} = require('../controllers/characters');

const mongodb = require('../data/database');

jest.mock('../data/database');

describe('Character routes', () => {
    describe('addChar', () => {
        test('should return 204 if character is created successfully', async () => {
            const req = { body: { Game: 'Test Game', User: 'Test User', Params: 'Test Params' } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

            const mockInsertOne = jest.fn().mockResolvedValue({ acknowledged: true });
            mongodb.characters = jest.fn(() => ({ insertOne: mockInsertOne }));

            await addChar(req, res);

            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalled();
        });
    });

    describe('getByGame', () => {
        test('should return characters for a given game ID', async () => {
            const req = { params: { gameId: '65cf4e8b50aa57c7612f835f' } };
            const res = {
                setHeader: jest.fn(),
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const mockFind = jest.fn().mockReturnValueOnce({
                toArray: jest.fn().mockResolvedValue([{ Game: 'Test Game', User: 'Test User', Params: 'Test Params' }])
            });
            mongodb.characters = jest.fn(() => ({ find: mockFind }));

            await getByGame(req, res);

            expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([{ Game: 'Test Game', User: 'Test User', Params: 'Test Params' }]);
        });
    });

    describe('getById', () => {
        test('should return a character for a given ID', async () => {
            const req = { params: { charId: '65cf4e8b50aa57c7612f835f' } };
            const res = { setHeader: jest.fn(), status: jest.fn().mockReturnThis(), json: jest.fn() };

            const mockFind = jest.fn().mockReturnValueOnce({
                toArray: jest.fn().mockResolvedValue([{ Game: 'Test Game', User: 'Test User', Params: 'Test Params' }])
            });
            mongodb.characters = jest.fn(() => ({ find: mockFind }));

            await getById(req, res);

            expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ Game: 'Test Game', User: 'Test User', Params: 'Test Params' });
        });
    });

    describe('updateChar', () => {
        test('should return 204 if character is updated successfully', async () => {
            const req = { params: { id: '65cf4e8b50aa57c7612f835f' }, body: { Game: 'Updated Game', User: 'Updated User', Params: 'Updated Params' } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

            const mockReplaceOne = jest.fn().mockResolvedValue({ modifiedCount: 1 });
            mongodb.characters = jest.fn(() => ({ replaceOne: mockReplaceOne }));

            await updateChar(req, res);

            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalled();
        });
    });

    describe('deleteChar', () => {
        test('should return 204 if character is deleted successfully', async () => {
            const req = { params: { id: '65cf4e8b50aa57c7612f835f' } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

            const mockDeleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });
            mongodb.characters = jest.fn(() => ({ deleteOne: mockDeleteOne }));

            await deleteChar(req, res);

            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalled();
        });
    });
});
