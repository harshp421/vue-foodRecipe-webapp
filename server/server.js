const express=require('express');
const app=express();
const cors = require('cors');
const DBconfig = require('./config/DBconnect');
const dotenv=require('dotenv').config();
const path = require('path');
const fs = require('fs');
const Recipe = require('./model/recipe.model');

//connect to the database
DBconfig();

//cors
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve portfolio website at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


 
app.get('/api', (req, res) => {
    // Read JSON data from file
    fs.readFile(path.join(__dirname, 'public', 'data.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        // Send JSON data as response
        res.json(JSON.parse(data));
    });
});

// for getting all the recipes from database
app.get('/api/recipes', (req, res) => {
    // Fetch data from MongoDB
    Recipe.find()
        .then(recipes => {
             // Construct the file path to the public folder
             const publicFolderPath = path.join(__dirname, 'public');
             // Construct the file path to data.json within the public folder
             const jsonFilePath = path.join(publicFolderPath, 'data.json');
            // Write data to data.json file
            fs.writeFile(jsonFilePath, JSON.stringify(recipes, null, 2), 'utf8', err => {
                if (err) {
                    console.error('Error writing to data.json file:', err);
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    console.log('Data saved to data.json file');
                    res.status(200).json({ message: 'Data saved to data.json file',recipes:recipes });
                }
            });
        })
        .catch(err => {
            console.error('Error fetching recipes from MongoDB:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

// for storing all data in database
app.post('/api/all-recipe',async(req,res)=>{
    try {
        const data = fs.readFileSync(path.join(__dirname, 'public', 'Recipe.json'), 'utf8');
        const recipes = JSON.parse(data);

        for (let recipe of recipes) {
            const newRecipe = new Recipe(recipe);
            await newRecipe.save();
        }

        res.status(200).json({ message: 'Data saved to MongoDB' });
    } catch (error) {
       res.status(500).json({ error: 'Internal Server Error' });
    }
})

//find meal by id 
app.get('/api/recipe/:id', (req, res) => {
    const id = req.params.id;
    Recipe.findById(id)
        .then(recipe => {
            if (!recipe) {
                res.status(404).json({ error: 'Recipe not found' });
            } else {
                res.status(200).json({recipe:recipe});
            }
        })
        .catch(err => {
            console.error('Error fetching recipe from MongoDB:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
} );

//creata an api that search the recipe by name
app.get('/api/search/:name', (req, res) => {
    const name = req.params.name;
    Recipe.find({ strMeal: { $regex: name, $options: 'i' } })
        .then(recipes => {
            if (recipes.length === 0) {
                res.status(404).json({ error: 'Recipe not found' });
            } else {
                res.status(200).json({recipes:recipes});
            }
        })
        .catch(err => {
            console.error('Error fetching recipe from MongoDB:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});
//create an api that give all recipes by alphabate 
app.get('/api/recipe/alphabate/:name', (req, res) => {
    const name = req.params.name;
    Recipe.find({ strMeal: { $regex: `^${name}`, $options: 'i' } })
        .then(recipes => {
            if (recipes.length === 0) {
                res.status(404).json({ error: 'Recipe not found' });
            } else {
                res.status(200).json({recipes:recipes});
            }
        })
        .catch(err => {
            console.error('Error fetching recipe from MongoDB:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

//create an api that give me all ingredients list from all recipes
app.get('/api/ingredients', (req, res) => {
    Recipe.find()
        .then(recipes => {
            const ingredients = new Set();
            for (let recipe of recipes) {
                for (let i = 1; i <= 20; i++) {
                    const ingredient = recipe[`strIngredient${i}`];
                    if (ingredient) {
                        ingredients.add(ingredient);
                    }
                }
            }
            const ingredientsArray = Array.from(ingredients);
            const ingredientsList = ingredientsArray.map((ingredient, index) => {
                return {
                    idIngredient: (index + 1).toString(),
                    strIngredient: ingredient
                };
            });
            res.status(200).json({ ingredients: ingredientsList });
          //  res.status(200).json({ingredients: Array.from(ingredients)});
        })
        .catch(err => {
            console.error('Error fetching recipes from MongoDB:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

//creata an api that search the recipe by ingredients
app.get('/api/recipe/ingredients/:name', (req, res) => {
    const name = req.params.name;
    Recipe.find({ $or: [{ strIngredient1: { $regex: name, $options: 'i' } }, { strIngredient2: { $regex: name, $options: 'i' } }, { strIngredient3: { $regex: name, $options: 'i' } }, { strIngredient4: { $regex: name, $options: 'i' } }, { strIngredient5: { $regex: name, $options: 'i' } }, { strIngredient6: { $regex: name, $options: 'i' } }, { strIngredient7: { $regex: name, $options: 'i' } }, { strIngredient8: { $regex: name, $options: 'i' } }, { strIngredient9: { $regex: name, $options: 'i' } }, { strIngredient10: { $regex: name, $options: 'i' } }, { strIngredient11: { $regex: name, $options: 'i' } }, { strIngredient12: { $regex: name, $options: 'i' } }, { strIngredient13: { $regex: name, $options: 'i' } }, { strIngredient14: { $regex: name, $options: 'i' } }, { strIngredient15: { $regex: name, $options: 'i' } }, { strIngredient16: { $regex: name, $options: 'i' } }, { strIngredient17: { $regex: name, $options: 'i' } }, { strIngredient18: { $regex: name, $options: 'i' } }, { strIngredient19: { $regex: name, $options: 'i' } }, { strIngredient20: { $regex: name, $options: 'i' } }] })
        .then(recipes => {
            if (recipes.length === 0) {
                res.status(404).json({ error: 'Recipe not found' });
            } else {
                res.status(200).json({recipes:recipes});
            }
        })
        .catch(err => {
            console.error('Error fetching recipe from MongoDB:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    );
}
);

// starting the server
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})