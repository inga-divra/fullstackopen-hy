const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
app.use(express.json());

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(morgan('tiny'));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

let persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/', (req, res) => {
  res.send('<h1>Hello from Backend</h1>');
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/info', (req, res) => {
  const personsTotal = persons.length;
  const currentTime = new Date();
  res.send(`
        <p>Phonebook has info for ${personsTotal} people</p>
        <p>${currentTime}</p>
        `);
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id.toString();
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id.toString();
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

const generateId = () => {
  const id = Math.floor(Math.random() * 1000000);
  return String(id);
};

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({
      error: 'name missing',
    });
  }

  if (!body.number) {
    return res.status(400).json({
      error: 'number missing',
    });
  }

  const notUniqueName = persons.some((person) => person.name === body.name);
  if (notUniqueName) {
    return res.status(400).json({
      error: 'name must be unique',
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
