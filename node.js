const express = require('express'); // CommonJS modules 

const server = express();

server.get('/', (req, res) => {
    res.status(200).json({})
});

server.use(express.json()); // remember to invoke json()

const port = 5000;
server.listen(port,() => console.log('server running...'));


let users = [
    {
        id: "a_unique_id", // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
    },
]

server.get("/api/users", (req, res) => {
    res.status(200).json({ data: users });
});

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    let found = users.find(user => user.id === id);
    if(found) {
        res.status(201).json({ user: found });
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    } 
    
});
server.post("/api/users", (req, res) => {
    const user = req.body;
    if(!user.name || !user.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    } else {
        users.push(user);
        res.status(200).json({ user: user })
    }
});
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    let found = users.find(user => user.id === id);
    if(found) {
        users = users.filter(user => user.id !== id)
        res.status(201).json({ user: found });
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    } 
    
    
});
server.put("/api/users/:id", (req, res) => {
    const changes = req.body;
    const id = req.params.id;
    let found = users.find(user => user.id === id);
    try {
        if(!found) {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        } else {
            if(changes.name || changes.bio) {
                Object.assign(found, changes);
                res.status(200).json({ user: found });
            } else {
                res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
            }
        }
    } catch(errors) {
        res.status(500).json({ errorMessage: "The user information could not be modified." });
    }
    // res.status(200).json(hubs);
});













