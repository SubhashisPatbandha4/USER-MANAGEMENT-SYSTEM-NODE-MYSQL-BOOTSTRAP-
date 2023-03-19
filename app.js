
import express from 'express';
import { engine ,create} from 'express-handlebars';
import bodyParser from 'body-parser';

import { } from 'dotenv/config'
import router from './server/routes/user.js';
const port = process.env.PORT || 8081   
//db connection

// console.log(process.env.DB_HOST)
const app = express();
app.use(express.static('public'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const hbs = create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        foo(n) {
          return n+1;
        }
      }
});

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use("/",router)


app.listen(port, () => console.log("running on port", port));