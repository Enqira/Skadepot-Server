const express = require('express');
const formidable = require('formidable');
 
const app = express();
 
app.get('/', (req, res) => {
  res.sendStatus(200)

});
 
app.post('/upload', (req, res, next) => {
  const form = formidable({ multiples: true });
 
    
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ fields, files });
    console.log(fields, files)
    
    });
    
});
 
app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000 ...');
});



