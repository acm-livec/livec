/**
 * Reviewer self-nomination controller
 * @module controllers/users/reviewer/self-nominate
 */
const path = require('path');
const Reviewer = require(path.join(__dirname, '../../../models/users/reviewer/reviewer.model.js'));
const usersDb = require(path.join(__dirname, '../../../database/data/users/reviewer.json'));

/**
 * Mark the current reviewer as self-nominated.
 * Expects :userId param.
 * PATCH /reviewer/:userId/self-nominate
 */
async function selfNominate(req, res) {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: 'userId required' });
    try {
        let reviewer = usersDb.find(u => u.id == userId);
        if (!reviewer) return res.status(404).json({ error: 'Reviewer not found' });
        reviewer.selfNominated = true;
        // Save logic should persist reviewer update
        // For now, just respond with success and changed object (TODO: persist to disk)
        return res.status(200).json({ ok: true, reviewer });
    } catch (e) {
        return res.status(500).json({ error: 'Internal error', details: e+'' });
    }
}

module.exports = { selfNominate };