const express = require("express");
const path = require("node:path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const viewsDir = path.join(__dirname, "../templates/views");
const publicDir = path.join(__dirname, "../public");
const partialDir = path.join(__dirname, "../templates/partials");

// Setup hbs engine and views location
app.set("views", viewsDir);
app.set("view engine", "hbs");
hbs.registerPartials(partialDir);

// Setup static directory to serve
app.use(express.static(publicDir));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Hadi",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Hadi",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is the help page",
    name: "Hadi",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You should provide an address!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          address: req.query.address,
          location: location,
          forecast: forecastData,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Not Found",
    message: "Help article not found",
    name: "Hadi",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Not Found",
    message: "Page not found.",
    name: "Hadi",
  });
});

app.listen(8000, () => {
  console.log(`app is running on port 8000`);
});
