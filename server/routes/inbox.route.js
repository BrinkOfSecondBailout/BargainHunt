const InboxController = require('../controllers/inbox.controller');

module.exports = function(app) {
    app.post('/api/inbox/new/:id', InboxController.addToInbox);
    app.get('/api/inbox/:id', InboxController.showMyInbox);
    app.get('/api/inbox/reset/:id', InboxController.resetNewMessageCount);
    app.get('/api/inbox/show/:id/:userId', InboxController.allMessagesByCorrespondence);
    app.delete('/api/inbox/delete/:userId/:threadId', InboxController.deleteMessageThread)
}