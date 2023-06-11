const {Inbox} = require('../models/inbox.model');
const {Message} = require('../models/message.model');
const {User} = require('../models/user.model');

module.exports.addToInbox = async(request, response) => {
    const id = request.params.id;
    try {
        const inbox = await Inbox.findOne({userId: id})
        const inbox2 = await Inbox.findOne({userId: request.body.user._id})
        const itemIndex = inbox.messageThreads.findIndex(thread => thread.correspondence._id == request.body.user._id)
        const itemIndex2 = inbox2.messageThreads.findIndex(thread => thread.correspondence._id == id)
        const message = await Message.create({message: request.body.message})
        const message2 = await Message.create({message: request.body.message, unread: "false"})
        // if opposite party's inbox does NOT have a thread with the sender/user
        if (itemIndex === -1) {
            // to the opposite party, find their inbox and add this new thread
            const correspondence = await User.findOne({_id: request.body.user._id})
            inbox.messageThreads.push({correspondence: correspondence})
            const newItemIndex = inbox.messageThreads.findIndex(thread => thread.correspondence._id == request.body.user._id)
            inbox.messageThreads[newItemIndex].messages.push({path: "in", message: message})
            inbox.messageThreads[newItemIndex].updatedAt = Date.now()
            inbox.newMessageCount += 1
            await inbox.save();

            // if the user's inbox also does NOT have a thread 
            if (itemIndex2 === -1) {
                // find the user's inbox and add this new thread
                const correspondence2 = await User.findOne({_id: id})
                inbox2.messageThreads.push({correspondence: correspondence2})
                const newItemIndex2 = inbox2.messageThreads.findIndex(thread => thread.correspondence._id == id)
                inbox2.messageThreads[newItemIndex2].messages.push({path: "out", message: message2})
                inbox2.messageThreads[newItemIndex2].updatedAt = Date.now()
                await inbox2.save();
                response.json("New message thread successfully added")
            } else {
                // if the user's inbox DOES have a thread
                inbox2.messageThreads[itemIndex2].messages.push({path: "out", message: message2})
                inbox2.messageThreads[itemIndex2].updatedAt = Date.now()
                await inbox2.save();
                response.json("New message successfully added to existing thread")
            }
        // if opposite party's inbox does have a thread with the sender/user
        } else {
            // to the opposite party, find their inbox and add to the existing thread
            inbox.messageThreads[itemIndex].messages.push({path: "in", message: message})
            inbox.messageThreads[itemIndex].updatedAt = Date.now()
            inbox.newMessageCount += 1
            await inbox.save();
            if (itemIndex2 === -1) {
                // if the user does NOT have an existing thread, find the user's inbox and add new thread
                const correspondence2 = await User.findOne({_id: id})
                inbox2.messageThreads.push({correspondence: correspondence2})
                const newItemIndex2 = inbox2.messageThreads.findIndex(thread => thread.correspondence._id == id)
                inbox2.messageThreads[newItemIndex2].messages.push({path: "out", message: message2})
                inbox2.messageThreads[newItemIndex2].updatedAt = Date.now()
                await inbox2.save();

                response.json("New message thread successfully added")

            } else {
                // if the user ALSO have an existing thread, find the user's inbox and add to the existing thread
                
                inbox2.messageThreads[itemIndex2].messages.push({path: "out", message: message2})
                inbox2.messageThreads[itemIndex2].updatedAt = Date.now()
                await inbox2.save();
    
                response.json("New message successfully added to existing thread")
            }
        }
    } catch(err) {
        response.json(err)
    }
}

module.exports.showMyInbox = async(request, response) => {
    const id = request.params.id;
    Inbox.findOne({userId: id})
        .populate({
            path: 'messageThreads.correspondence',
            model: 'User'
        })
        .populate({
            path: 'messageThreads.messages.message',
            model: 'Message'
        })
        .then(inbox => response.json(inbox))
        .catch(err => response.json(err))
}

module.exports.allMessagesByCorrespondence = async(request, response) => {
    const id = request.params.id;
    const myId = request.params.userId;

    try {
        const inbox = await Inbox.findOne({userId: myId})
        .populate({
            path: 'messageThreads.correspondence',
            model: 'User'
        })
        .populate({
            path: 'messageThreads.messages.message',
            model: 'Message'
        })
        const itemIndex = inbox.messageThreads.findIndex(thread => thread.correspondence._id == id)
        const allMessages = inbox.messageThreads[itemIndex].messages
        for (let i = 0; i < allMessages.length; i++) {
            allMessages[i].message.unread = "false"
            await allMessages[i].message.save();
        }
        await inbox.save()
        response.json(allMessages)
    } catch (err) {
        response.json(err)
    }
}

module.exports.resetNewMessageCount = async (request, response) => {
    const id = request.params.id;
    try {
        const inbox = await Inbox.findOne({userId: id})
        inbox.newMessageCount = 0;
        await inbox.save();
        response.json("Reset successful")
    } catch (err) {
        response.json(err)
    }
}

module.exports.deleteMessageThread = async (request, response) => {
    const userId = request.params.userId;
    const threadId = request.params.threadId;
    try {
        const inbox = await Inbox.findOne({userId: userId})
        if (!inbox) {
            return response.status(404).json({ error: 'Inbox not found' });
        }

        const updatedMessageThreads = inbox.messageThreads.filter(thread => thread._id != threadId);
        inbox.messageThreads = updatedMessageThreads;
        await inbox.save();

        return response.json({ message: 'Message thread deleted successfully' });
    } catch (err) {
        response.json(err)
    }
}