const Exhibition = require("../Models/Exhibition");
const News = require("../Models/News");
const User = require("../Models/User");
const Role = require("../Models/Role");

async function createUser() {
  try {
    // const news = await News.create({
    //   name: "Title 3",
    //   content: "The best news content",
    //   publishedBy: "624846a6fcf2d4fce22c9b7b",
    //   feedback: [
    //     {
    //       content: "Hello, this is my comment!",
    //       author: "624846a6fcf2d4fce22c9b7b",
    //     },
    //   ],
    // });
    // const exhibition = await Exhibition.create({
    //   name: "12 rules of life",
    //   place: "Ottava",
    //   content: "The exhibition is about the book",
    //   status: 0,
    //   endDate: Date.now(),
    //   theme: "Chaos and order",
    //   price: 15,
    //   feedback: [
    //     {
    //       content: "Hello, this is my comment!",
    //       author: "624846a6fcf2d4fce22c9b7b",
    //     },
    //     {
    //       content: "Hello, this is my another comment!",
    //       author: "624846a6fcf2d4fce22c9b7b",
    //     },
    //   ],
    // });

		const role = await Role.create({
			value: "ADMIN"
		})

    await role.save();
    console.log(role);
  } catch (e) {
    console.log(e);
  }
}

module.exports = createUser;
