// code away!
const server = require('./server');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

const port = process.env.PORT || 7800;

server.use("/users", userRouter);
server.use("/posts", postRouter);

/***************error middleware that catches any errors from other middleware functions **************************/
server.use((err, req, res, next) => {
    console.log(err)

    res.status(500).json({ message: "Something went wrong"})
})

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});