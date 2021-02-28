const userInput = {
  username: "mahmoudosman",
  password: "12345678910",
  role: "admin",
};

const user = new User(userInput);

user.save((err, document) => {
  if (err) console.log(err);
  console.log(document);
});
