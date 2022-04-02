const News = require("../Models/News");
const User = require("../Models/User");

async function createUser() {
  try {
    const user = await News.create({
      name: "Title 3",
      content: "The best news content",
      publishedBy: "624846a6fcf2d4fce22c9b7b",
      feedback: [
        {
          content: "Hello, this is my comment!",
          author: "624846a6fcf2d4fce22c9b7b",
        },
      ],
    });

    await user.save();
    console.log(user);
  } catch (e) {
    console.log(e);
  }
}

module.exports = createUser;
