const {
    addGame,
    getByID,
    getByMaster,
    getByUser,
    updateGame,
    deleteGame
} = require('../controllers/games');

const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

jest.mock('express-validator', () => ({
    validationResult: jest.fn(() => ({
        isEmpty: jest.fn().mockReturnValue(true),
        array: jest.fn().mockReturnValue([])
    }))
}));

describe('Games routes', () => { 
    describe('addGame', () => {
        test('should return 204 if game is created successfully', async () => {
            const req = { body: { Name: 'Test Name', Master: 'Test Master', Players: [], Description: 'Test Description', Attributes: [] } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

            const mockInsertOne = jest.fn().mockResolvedValue({ acknowledged: true });
            mongodb.games = jest.fn(() => ({ insertOne: mockInsertOne }));

            await addGame(req, res);

            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalled();
        });
    });

    describe('getByID', () => {
        test('should return a game for a given ID', async () => {
            const req = { params: { gameId: '65cf4e8b50aa57c7612f835f' } };
            const res = { setHeader: jest.fn(), status: jest.fn().mockReturnThis(), json: jest.fn() };

            const mockFind = jest.fn().mockReturnValueOnce({
                toArray: jest.fn().mockResolvedValue([{ Name: 'Test Name', Master: 'Test Master', Players: [], Description: 'Test Description', Attributes: [] }])
            });
            mongodb.games = jest.fn(() => ({ find: mockFind }));

            await getByID(req, res);

            expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ Name: 'Test Name', Master: 'Test Master', Players: [], Description: 'Test Description', Attributes: [] });
        });
    });

    describe('getByMaster', () => {
        test('should return games for a given master ID', async () => {
            const req = { params: { userId: '65cf4e8b50aa57c7612f835f' } };
            const res = { setHeader: jest.fn(), status: jest.fn().mockReturnThis(), json: jest.fn() };

            const mockFind = jest.fn().mockReturnValueOnce({
                toArray: jest.fn().mockResolvedValue([{ Name: 'Test Name', Master: 'Test Master', Players: [], Description: 'Test Description', Attributes: [] }])
            });
            mongodb.games = jest.fn(() => ({ find: mockFind }));

            await getByMaster(req, res);

            expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([{ Name: 'Test Name', Master: 'Test Master', Players: [], Description: 'Test Description', Attributes: [] }]);
        });
    });

    describe('getByUser', () => {
        test('should return games for a given user ID', async () => {
            const req = { params: { userId: '65cf4e8b50aa57c7612f835f' } };
            const res = { setHeader: jest.fn(), status: jest.fn().mockReturnThis(), json: jest.fn() };

            const mockFind = jest.fn().mockReturnValueOnce({
                toArray: jest.fn().mockResolvedValue([{ Name: 'Test Name', Master: 'Test Master', Players: ['65cf4e8b50aa57c7612f835f'], Description: 'Test Description', Attributes: [] }])
            });
            mongodb.games = jest.fn(() => ({ find: mockFind }));

            await getByUser(req, res);

            expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([{ Name: 'Test Name', Master: 'Test Master', Players: ['65cf4e8b50aa57c7612f835f'], Description: 'Test Description', Attributes: [] }]);
        });
    });

    describe('updateGame', () => {
        test('should return 204 if game is updated successfully', async () => {
            const req = { params: { gameId: '65cf4e8b50aa57c7612f835f' }, body: { Name: 'Updated Name', Master: 'Updated Master', Players: ['player1', 'player2'], Description: 'Updated Description', Attributes: ['attr1', 'attr2'] } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

            const mockReplaceOne = jest.fn().mockResolvedValue({ modifiedCount: 1 });
            mongodb.games = jest.fn(() => ({ replaceOne: mockReplaceOne }));

            await updateGame(req, res);

            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalled();
        });
    });

    describe('deleteGame', () => {
        test('should return 204 if game is deleted successfully', async () => {
            const req = { params: { gameId: '65cf4e8b50aa57c7612f835f' } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

            const mockDeleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });
            mongodb.games = jest.fn(() => ({ deleteOne: mockDeleteOne }));

            await deleteGame(req, res);

            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalled();
        });
    });
});
