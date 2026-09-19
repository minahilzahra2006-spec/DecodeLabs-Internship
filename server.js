const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

let burgers = [
    { id: 1, name: "Classic Beef", price: 8.99 },
    { id: 2, name: "Crispy Chicken", price: 9.49 },
    { id: 3, name: "Smoky BBQ", price: 10.49 },
    { id: 4, name: "Double Cheese", price: 11.99 }
];

app.get("/", (req, res) => {
    res.send("Burger API is running! Go to /burgers to see the menu.");
});

app.get("/burgers", (req, res) => {
    res.json(burgers);
});

app.get("/burgers/:id", (req, res) => {
    const id = Number(req.params.id);
    const burger = burgers.find((item) => item.id === id);

    if (!burger) {
        return res.status(404).json({ message: "Burger not found" });
    }
    res.json(burger);
});

app.post("/burgers", (req, res) => {
    const { name, price } = req.body;

    if (!name || !price) {
        return res.status(400).json({ error: "Bad Request: Name and price are required!" });
    }

    const newBurger = {
        id: burgers.length + 1,
        name: name,
        price: parseFloat(price)
    };

    burgers.push(newBurger);
    res.status(201).json({
        message: "Burger added successfully!",
        data: newBurger
    });
});

app.put("/burgers/:id", (req, res) => {
    const id = Number(req.params.id);
    
    if (!req.body) {
        return res.status(400).json({ error: "Please provide body data to update" });
    }

    const { name, price } = req.body;
    const burger = burgers.find((item) => item.id === id);

    if (!burger) {
        return res.status(404).json({ message: "Burger not found" });
    }

    if (name) burger.name = name;
    if (price) burger.price = parseFloat(price);

    res.json({
        message: "Burger updated successfully!",
        data: burger
    });
});

app.delete("/burgers/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = burgers.findIndex((item) => item.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Burger not found" });
    }

    const deletedBurger = burgers.splice(index, 1);

    res.json({
        message: "Burger deleted successfully!",
        data: deletedBurger[0]
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});