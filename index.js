let express = require('express')
let app = express()
let port = process.env.PORT || 3000
let routes = require('./routes/index.js')
const cors = require('cors');

app.use(cors())
app.use(express.static('public'))
app.use('/public',express.static('public'));
app.use('/', routes)

app.set('view-engine', 'ejs')

app.listen(port, function(){
  console.log('listening on', port)
})
