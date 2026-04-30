const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Blog anchor redirect
app.get('/blog', (req, res) => {
  res.redirect('/#blog');
});
// Testimonials anchor redirect
app.get('/testimonials', (req, res) => {
  res.redirect('/#testimonials');
});
// Newsletter anchor redirect
app.get('/newsletter', (req, res) => {
  res.redirect('/#newsletter');
});

app.post('/newsletter', (req, res) => {
  // In a real app, you would store the email here
  res.render('newsletter', { success: true });
});


const spices = require('./spices');


app.get('/', (req, res) => {
  res.render('index', {
    spices,
    loginError: '',
    showLoginModal: req.query.login === '1',
    emailValue: ''
  });
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
  res.redirect('/#spices');
});

app.get('/about', (req, res) => {
  res.redirect('/#about');
});

// Contact form anchor redirect
app.get('/contact', (req, res) => {
  res.redirect('/#contact');
});

app.post('/contact', (req, res) => {
  // In a real app, you would send/store the message here
  res.render('contact', { success: true });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render('index', {
      spices,
      loginError: 'Please enter both email and password.',
      showLoginModal: true,
      emailValue: email || ''
    });
  }

  const validUser = email === 'hello@aroha.com' && password === 'spice2026';

  if (!validUser) {
    return res.render('index', {
      spices,
      loginError: 'Invalid email or password. Please try again.',
      showLoginModal: true,
      emailValue: email
    });
  }

  res.redirect('/#spices');
});

app.get('/signup', (req, res) => {
  res.render('signup', { success: false, formData: {} });
});

app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const success = Boolean(name && email && password);

  res.render('signup', {
    success,
    formData: {
      name: name || '',
      email: email || ''
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Aroha Spices and Condiment website running on port ${PORT}`);
});
