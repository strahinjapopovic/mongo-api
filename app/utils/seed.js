const { User, Thought } = require("../models");
const db = require("../config/connection");
const ObjectId = require("mongoose").Types.ObjectId;
const { emailArr, usernameArr, thoughtTxtArr, reactionTxtArr} = require("./data");

db.once("open", async () => {
    console.log(`Database connection open...`);
    try {
        let userDropCheck = await db.db.listCollections({ name: "users" }).toArray();
        if(userDropCheck.length) {
            await db.dropCollection("users");
            console.log(`---------- MongoDB Collection users droped! ----------`);
        }
        let thoughtDropCheck = await db.db.listCollections({ name: "thoughts" }).toArray();
        if(thoughtDropCheck.length) {
            await db.dropCollection("thoughts");
            console.log(`---------- MongoDB Collection thoughts droped! ----------`);
        }
        const thoughtData = await Thought.create(
            {
                thought_text: thoughtTxtArr[0],
                username: usernameArr[0],
                reactions: [
                    {
                        reaction_body: reactionTxtArr[2],
                        username: usernameArr[2],
                    },
                ],
            },
            {
                thought_text: thoughtTxtArr[1],
                username: usernameArr[1],
                reactions: [
                    {
                        reaction_body: reactionTxtArr[0],
                        username: usernameArr[0],
                    },
                ],
            },
            {
                thought_text: thoughtTxtArr[2],
                username: usernameArr[2],
                reactions: [
                    {
                        reaction_body: reactionTxtArr[3],
                        username: usernameArr[3],
                    },
                ],
            },
            {
                thought_text: thoughtTxtArr[3],
                username: usernameArr[3],
                reactions: [
                    {
                        reaction_body: reactionTxtArr[4],
                        username: usernameArr[4],
                    },
                ],
            },
            {
                thought_text: thoughtTxtArr[4],
                username: usernameArr[4],
                reactions: [
                    {
                        reaction_body: reactionTxtArr[1],
                        username: usernameArr[1],
                    },
                ],
            },
        );
        const userData = await User.create(
            {
                username: usernameArr[0],
                email: emailArr[0],
                thoughts: [{ _id: thoughtData[0]._id },],
                friends: [],
                friendCount: [],
            },
            {
                username: usernameArr[1],
                email: emailArr[1],
                thoughts: [{ _id: thoughtData[1]._id },],
                friends: [],
                friendCount: [],
            },
            {
                username: usernameArr[2],
                email: emailArr[2],
                thoughts: [{ _id: thoughtData[2]._id },],
                friends: [],
                friendCount: [],
            },
            {
                username: usernameArr[3],
                email: emailArr[3],
                thoughts: [{ _id: thoughtData[3]._id },],
                friends: [],
                friendCount: [],
            },
            {
                username: usernameArr[4],
                email: emailArr[4],
                thoughts: [{ _id: thoughtData[4]._id },],
                friends: [],
                friendCount: [],
            },
        );
        console.log(`\n----------Loading seed for collection thoughts...`);
        console.log(thoughtData);
        console.log(`---------- Thought Model data seeded ----------`);
        console.log(`\n----------Loading seed for collection users...`);
        console.log(userData);
        console.log(`---------- User Model data seeded ----------`);

        console.log(`\n----------Loading updating seed for collection users array friends...`);
        await User.findOneAndUpdate({_id: userData[0]._id}, { $push: { friends: [{ _id: new ObjectId(`${userData[2]._id}`) },],}});
        const user0 = await User.findOne({_id: userData[0]._id});
        console.log(user0);

        await User.findOneAndUpdate({_id: userData[1]._id}, { $push: { friends: [{ _id: new ObjectId(`${userData[0]._id}`) },],}});
        const user1 = await User.findOne({_id: userData[1]._id});
        console.log(user1);

        await User.findOneAndUpdate({_id: userData[2]._id}, { $push: { friends: [{ _id: new ObjectId(`${userData[3]._id}`) },],}});
        const user2 = await User.findOne({_id: userData[2]._id});
        console.log(user2);

        await User.findOneAndUpdate({_id: userData[3]._id}, { $push: { friends: [{ _id: new ObjectId(`${userData[4]._id}`) },],}});
        const user3 = await User.findOne({_id: userData[3]._id});
        console.log(user3);

        await User.findOneAndUpdate({_id: userData[4]._id}, { $push: { friends: [{ _id: new ObjectId(`${userData[1]._id}`) },],}});
        const user4 = await User.findOne({_id: userData[4]._id});
        console.log(user4);
        console.log(`---------- User Model data updated ----------`);
        console.log(`\n---------- Seeding completed successfully. ----------`);
        process.exit(0);
        
    } catch (error) {
        console.log(`ERROR message: ${error}`);
    }
});