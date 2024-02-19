const {
    addUser,
    getAll,
    getSingle,
    updateUser,
    deleteUser
} = require('../controllers/users');

const mongodb = require('../data/database');
const bcrypt = require('bcrypt');

jest.mock('bcrypt', () => ({
    hashSync: jest.fn(),
}));

jest.mock('express-validator', () => ({
    validationResult: jest.fn(() => ({
        isEmpty: jest.fn().mockReturnValue(true),
        array: jest.fn().mockReturnValue([])
    }))
}));

describe('User routes', () => {
    describe('addUser', () => {
        test('should return 204 if user is created successfully', async () => {
            const req = {
                body: {
                    Name: 'Test Name',
                    Username: 'testuser',
                    Email: 'test@example.com',
                    Password: 'testpassword',
                    Birthdate: '01-01-1990',
                    Gender: 'M',
                    Country: 'USA'
                }
            };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

            bcrypt.hashSync.mockReturnValue('hashedpassword');

            const mockInsertOne = jest.fn().mockResolvedValue({ acknowledged: true });
            mongodb.users = jest.fn(() => ({ insertOne: mockInsertOne }));

            await addUser(req, res);

            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalled();
            expect(bcrypt.hashSync).toHaveBeenCalledWith('testpassword', 10);
        });
    });

    describe('getAll', () => {
        test('should return all users', async () => {
            const req = {};
            const res = { setHeader: jest.fn(), status: jest.fn().mockReturnThis(), json: jest.fn() };

            const mockFind = jest.fn().mockReturnValueOnce({
                toArray: jest.fn().mockResolvedValue([{ Name: 'Test User' }])
            });
            mongodb.users = jest.fn(() => ({ find: mockFind }));

            await getAll(req, res);

            expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([{ Name: 'Test User' }]);
        });
    });

    describe('getSingle', () => {
        test('should return a single user', async () => {
            const req = { params: { id: '65cf4e8b50aa57c7612f835f' } };
            const res = { setHeader: jest.fn(), status: jest.fn().mockReturnThis(), json: jest.fn() };

            const mockFind = jest.fn().mockReturnValueOnce({
                toArray: jest.fn().mockResolvedValue([{ Name: 'Test User' }])
            });
            mongodb.users = jest.fn(() => ({ find: mockFind }));

            await getSingle(req, res);

            expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ Name: 'Test User' });
        });
    });

    describe('updateUser', () => {
        test('should return 204 if user is updated successfully', async () => {
            const req = {
                params: { id: '65cf4e8b50aa57c7612f835f' },
                body: {
                    Name: 'Updated Test Name',
                    Username: 'updatedtestuser',
                    Email: 'updatedtest@example.com',
                    Password: 'updatedtestpassword'
                }
            };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

            bcrypt.hashSync.mockReturnValue('updatedhashedpassword');

            const mockReplaceOne = jest.fn().mockResolvedValue({ modifiedCount: 1 });
            mongodb.users = jest.fn(() => ({ replaceOne: mockReplaceOne }));

            await updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalled();
            expect(bcrypt.hashSync).toHaveBeenCalledWith('updatedtestpassword', 10);
        });
    });

    describe('deleteUser', () => {
        test('should return 204 if user is deleted successfully', async () => {
            const req = { params: { id: '65cf4e8b50aa57c7612f835f' } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

            const mockDeleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });
            mongodb.users = jest.fn(() => ({ deleteOne: mockDeleteOne }));

            await deleteUser(req, res);

            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalled();
        });
    });
});
