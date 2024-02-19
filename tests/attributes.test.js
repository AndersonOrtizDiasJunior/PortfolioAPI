const {
    addAttribute,
    getByGame,
    getByID,
    updateAttribute,
    deleteAttribute
} = require('../controllers/attributes');

const mongodb = require('../data/database');
const { ObjectId } = require('mongodb').ObjectId;
    jest.mock('express-validator', () => ({
        validationResult: jest.fn(() => ({
            isEmpty: jest.fn().mockReturnValue(true),
            array: jest.fn().mockReturnValue([])
        }))
    }));

describe('Attributes routes', () => { 
    describe('addAttribute', () => {
    test('should return 204 if attribute is created successfully', async () => {
        const req = { body: { Name: 'Test Name', Type: 'Test Type' } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        const mockInsertOne = jest.fn().mockResolvedValue({ acknowledged: true });
        mongodb.attributes = jest.fn(() => ({ insertOne: mockInsertOne }));

        await addAttribute(req, res);

        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalled();
    });
});

describe('getByGame', () => {
    test('should return attributes for a given game ID', async () => {
        const req = { params: { gameId: '65cf4e8b50aa57c7612f835f' } };
        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const mockFindGame = jest.fn().mockReturnValueOnce({
            toArray: jest.fn().mockResolvedValue([{ Attributes: ['65cf4e8b50aa57c7612f835f'] }])
        });
        const mockFindAtt = jest.fn().mockReturnValueOnce({
            toArray: jest.fn().mockResolvedValue([{ Name: 'value', Type: 'Type' }])
        });
        mongodb.games = jest.fn(() => ({ find: mockFindGame }));
        mongodb.attributes = jest.fn(() => ({ find: mockFindAtt }));

        await getByGame(req, res);

        expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ Name: 'value', Type: 'Type' }]);
    });
});

describe('getByID', () => {
    test('should return an attribute for a given ID', async () => {
        const req = { params: { attId: '65cf4e8b50aa57c7612f835f' } };
        const res = { setHeader: jest.fn(), status: jest.fn().mockReturnThis(), json: jest.fn() };

        const mockFind = jest.fn().mockReturnValueOnce({
            toArray: jest.fn().mockResolvedValue([{ attribute: 'value' }])
        });
        mongodb.attributes = jest.fn(() => ({ find: mockFind }));

        await getByID(req, res);

        expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ attribute: 'value' });
    });
});

describe('updateAttribute', () => {
    test('should return 204 if attribute is updated successfully', async () => {
        const req = { params: { id: '65cf4e8b50aa57c7612f835f' }, body: { Name: 'Updated Name', Type: 'Updated Type' } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        const mockReplaceOne = jest.fn().mockResolvedValue({ modifiedCount: 1 });
        mongodb.attributes = jest.fn(() => ({ replaceOne: mockReplaceOne }));

        await updateAttribute(req, res);

        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalled();
    });
});

describe('deleteAttribute', () => {
    test('should return 204 if attribute is deleted successfully', async () => {
        const req = { params: { id: '65cf4e8b50aa57c7612f835f' } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        const mockDeleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });
        mongodb.attributes = jest.fn(() => ({ deleteOne: mockDeleteOne }));

        await deleteAttribute(req, res);

        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalled();
    });
});
})
    
