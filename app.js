// Blog page
app.get('/blog', (req, res) => {
  res.render('blog');
});
// Testimonials page
app.get('/testimonials', (req, res) => {
  res.render('testimonials');
});
// Newsletter signup
app.get('/newsletter', (req, res) => {
  res.render('newsletter', { success: false });
});

app.post('/newsletter', (req, res) => {
  // In a real app, you would store the email here
  res.render('newsletter', { success: true });
});
const express = require('express');
const path = require('path');

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


const spices = require('./spices');


app.get('/', (req, res) => {
  res.render('index', { spices: spices.slice(0, 3) });
});

// Spice detail page
app.get('/spices/:name', (req, res) => {
  const spice = spices.find(s => s.name.toLowerCase() === req.params.name.toLowerCase());
  if (!spice) {
    return res.status(404).send('Spice not found');
  }
  res.render('spice/detail', { spice });
});

app.get('/spices', (req, res) => {
  res.render('spices', { spices });
});


app.get('/about', (req, res) => {
  res.render('about');
});

// Contact form
app.get('/contact', (req, res) => {
  res.render('contact', { success: false });
});

app.post('/contact', (req, res) => {
  // In a real app, you would send/store the message here
  res.render('contact', { success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Simple Spices website running on port ${PORT}`);
});
