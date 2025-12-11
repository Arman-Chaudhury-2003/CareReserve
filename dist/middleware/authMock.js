"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMock = authMock;
function authMock(req, _res, next) {
    // For now, just mock a patient user.
    // You can change this with a header (e.g. x-role) if needed.
    const roleHeader = req.header('x-role');
    req.user = {
        id: '00000000-0000-0000-0000-000000000001',
        role: roleHeader === 'ADMIN' ? 'ADMIN' : 'PATIENT'
    };
    next();
}
