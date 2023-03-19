import mysql from "mysql"
import conn from "../../config/config.js"




export const view = (req, res) => {



    // Use the connection
    conn.query('SELECT * FROM users where status="active"', (error, results) => {


        // Handle error after the release.
        if (error) throw error;

        //used to send delete status
       let remove = req.query.delete;
        // console.log(results.length)
        if (results.length == 0)
            res.render("home", { results, message: true, remove })
        else
            res.render("home", { results, message: false, remove })


    });
}






// find user
export const find = (req, res) => {



    let searchItem = req.body.search

    conn.query('SELECT * FROM users WHERE first_name LIKE ? or last_name LIKE ?', ['%' + searchItem + '%', '%' + searchItem + '%'], (err, results) => {

        if (err) throw err;
        else {
            res.render("home", { results })
        }
    });


}




// add new user
export const form = (req, res) => {
    res.render('adduser')


}
// add new user
export const create = (req, res) => {

    const { first_name, last_name, email, phone, comment } = req.body;
    // console.log(req.body)

    conn.query('INSERT INTO users SET first_name= ? , last_name =?,email= ? , phone =?,comments= ?', [first_name, last_name, email, phone, comment], (err, results) => {

        if (err) throw err;
        else {
            res.render("adduser", { alert: "user added successfully" })
        }
    });





}
// veiw a user

export const getuser = (req, res) => {


    // Use the connection
    conn.query('SELECT * FROM users where id=? ', [req.params.id], (error, results) => {


        // Handle error after the release.
        if (error) throw error;
        console.log(results)
        res.render("viewuser", { results })



    });
}

// edit new user

export const edit = (req, res) => {


    // Use the connection
    conn.query('SELECT * FROM users where id=? ', [req.params.id], (error, results) => {


        // Handle error after the release.
        if (error) throw error;
        console.log(results)
        res.render("edituser", { results })



    });
}
export const update = (req, res) => {

    const { first_name, last_name, email, phone, comment } = req.body;
    // Use the connection
    conn.query('UPDATE users  SET first_name= ? , last_name =?,email= ? , phone =?,comments= ? where id=? ', [first_name, last_name, email, phone, comment, req.params.id], (error, results) => {


        // Handle error after the release.
        if (error) throw error;
        // console.log(results)
        // Use the connection
        conn.query('SELECT * FROM users where id=?', [req.params.id], (error, results) => {
            // Handle error after the release.
            if (error) throw error;
            res.render("edituser", { results, message: "Updated Successfully:)" })
        });
    });
}
export const remove = (req, res) => {
    // Use the connection
    conn.query('UPDATE  users SET status="removed" WHERE   id=? ', [req.params.id], (error, results) => {
        // Handle error after the release.
        if (error) throw error;
        // console.log(results)
        res.redirect("/?delete=true")
    });
}
