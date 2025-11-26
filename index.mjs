import express from 'express';
import fetch from 'node-fetch';
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async (req, res) => {
   let url = "https://csumb.space/api/famousQuotes/getRandomQuote.php";
   let response = await fetch(url);
   let data = await response.json();
   console.log(data);
   res.render("home", {"quote": data.quoteText , "by": data.firstName, "": data.lastName});
});

// Node.js Route
app.get('/entities', async (req, res) => {
   try {
      let url = "https://www.surveillancewatch.io/api/v1/entities";
      let response = await fetch(url);
      let data = await response.json();
      console.log(data);
      res.render("entities", { entities: data.items });
   } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching data");
   }
});

app.get('/proponents', (req, res) => {
   res.render("proponents");
   //res.send('Hello Express app!')
});
app.get('/types', (req, res) => {
   res.render("types");
   //res.send('Hello Express app!')
});

app.get('/resources', (req, res) => {
   res.render("resources");
   //res.send('Hello Express app!')
});

app.listen(3000, () => {
   console.log('server started');
});