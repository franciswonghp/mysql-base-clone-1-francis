const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
require('dotenv').config();
const { createConnection } = require('mysql2/promise');



let app = express();
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

require('handlebars-helpers')({
    handlebars:hbs.handlebars
})

wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

let connection;

async function main() {
    connection = await createConnection({
        'host': process.env.DB_HOST,
        'user': process.env.DB_USER,
        'database': process.env.DB_DATABASE,
        'password': process.env.DB_PASSWORD
    })

    app.get('/', (req,res) => {
        res.send('Hello, World!');
    });

    app.listen(3000, ()=>{
        console.log('Server is running')
    });

    app.get('/students', async (req, res) => {
        let [students] = await connection.execute('SELECT * FROM Students INNER JOIN Classes ON Students.class_id = Classes.class_id');
        res.render('students/index', {
            'students': students
        })
    })

    app.get('/students/create', async(req,res)=>{
        let [classes] = await connection.execute('SELECT * from Classes');
        res.render('students/add', {
            'classes': classes
        })
    })

    app.post('/students/create', async(req,res)=>{
        let {first_name, last_name, age, Class_id} = req.body;
        let query = 'INSERT INTO Students (first_name, last_name, age, class_id) VALUES (?, ?, ?, ?)';
        let bindings = [first_name, last_name, age, Class_id];
        await connection.execute(query, bindings);
        res.redirect('/students');
    })

    app.get('/students/:students_id/edit', async (req, res) => {
        let [students] = await connection.execute('SELECT * from Students WHERE student_id = ?', [req.params.students_id]);
        let [classes] = await connection.execute('SELECT * from Classes');
        let student = students[0];
        res.render('students/edit', {
            'students': students,
            'classes': classes
        })
    })

    app.post('/students/:students_id/edit', async (req, res) => {
        let {first_name, last_name, age, students_id, teacher_id} = req.body;
    
        let query = 'UPDATE Customers SET first_name=?, last_name=?, rating=?, company_id=? WHERE customer_id=?';
        let bindings = [first_name, last_name, rating, company_id, req.params.customer_id];
        await connection.execute(query, bindings);
    
        await connection.execute('DELETE FROM EmployeeCustomer WHERE customer_id = ?', [req.params.customer_id]);
    
        for (let id of employee_id) {
            let query = 'INSERT INTO EmployeeCustomer (employee_id, customer_id) VALUES (?, ?)';
            let bindings = [id, req.params.customer_id];
            await connection.execute(query, bindings);
        }
    
        res.redirect('/customers');
    });
    
    
    


    
    

    // const [Students] = await connection.execute({
    //     'sql':`
    //     SELECT * from Students
    //         JOIN Students ON Students.class_id = Class.class_id;
    //     `,
    //     nestTables: true

    // });
    
}

main();
