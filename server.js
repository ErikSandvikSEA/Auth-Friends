const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000;
const app = express();
const token =
  'esfeyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NUIhkufemQifQ';

let nextId = 7;

let friends = [
  {
    id: 1,
    name: 'Rachel Green',
    age: 30,
    email: 'rachel@friends.com',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQjwOYPA-wXfeKvXdQMHONR6Esl6Pm0VMbH5feAAxngB5eBwiY8&usqp=CAU'
  },
  {
    id: 2,
    name: 'Joey Tribbiani',
    age: 34,
    email: 'joey@friends.com',
    image: 'https://www.oneepicplace.com/wp-content/uploads/2019/04/JOEY-SUP.png'
  },
  {
    id: 3,
    name: 'Chandler Bing',
    age: 32,
    email: 'chandler@friends.com',
    image: 'https://i.pinimg.com/originals/68/5f/80/685f80863264c356c4cdb97ac956f35b.jpg'
  },
  {
    id: 4,
    name: 'Ross Geller',
    age: 32,
    email: 'ross@friends.com',
    image: 'https://socialnewsdaily.com/wp-content/uploads/2018/08/friendspivot.gif'
  },
  {
    id: 5,
    name: 'Monica Bing',
    age: 31,
    email: 'monica@friends.com',
    image: 'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=2000&h=2000&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F20%2F2018%2F10%2Fcourtney-cox-4-1.jpg'
  },
  {
    id: 6,
    name: 'Phoebe Buffay-Hannigan',
    age: 30,
    email: 'phoebe@friends.com',
    image: 'https://i.pinimg.com/originals/68/43/41/6843411a8e2b6bfc2026b78c70c05b4d.jpg'
  }
];

app.use(bodyParser.json());

app.use(cors());

function authenticator(req, res, next) {
  const { authorization } = req.headers;
  if (authorization === token) {
    next();
  } else {
    res.status(403).json({ error: 'User must be logged in to do that.' });
  }
}

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'real username' && password === 'asdf') {
    req.loggedIn = true;
    res.status(200).json({
      payload: token
    });
  } else {
    res
      .status(403)
      .json({ error: 'Username or Password incorrect. Please see Readme' });
  }
});

app.get('/api/friends', authenticator, (req, res) => {
  setTimeout(() => {
    res.send(friends);
  }, 1000);
});

app.get('/api/friends/:id', authenticator, (req, res) => {
  const friend = friends.find(f => f.id == req.params.id);

  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).send({ msg: 'Friend not found' });
  }
});

app.post('/api/friends', authenticator, (req, res) => {
  const friend = { id: getNextId(), ...req.body };

  friends = [...friends, friend];

  res.send(friends);
});

app.put('/api/friends/:id', authenticator, (req, res) => {
  const { id } = req.params;

  const friendIndex = friends.findIndex(f => f.id == id);

  if (friendIndex > -1) {
    const friend = { ...friends[friendIndex], ...req.body };

    friends = [
      ...friends.slice(0, friendIndex),
      friend,
      ...friends.slice(friendIndex + 1)
    ];
    res.send(friends);
  } else {
    res.status(404).send({ msg: 'Friend not found' });
  }
});

app.delete('/api/friends/:id', authenticator, (req, res) => {
  const { id } = req.params;

  friends = friends.filter(f => f.id !== Number(id));

  res.send(friends);
});

function getNextId() {
  return nextId++;
}

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
