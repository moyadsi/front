create database prueba;
use prueba;
drop table persona;

CREATE TABLE Persona (
    Id INT PRIMARY KEY,
    name1 CHAR(50) NOT NULL,
    lastname CHAR(50) NOT NULL,
    celphone CHAR(30) DEFAULT '',
    email CHAR(100) NOT NULL,
    passwords CHAR(100) NOT NULL,
    state BOOLEAN DEFAULT TRUE,
    date1 DATETIME
);

INSERT INTO persona(Id,name1,lastname,celphone,email,passwords,state,date1) values(1,"Diana", "Moya","3002507458","dianamoya@igenieros.com","sena2023",true,"2023-05-18");

select * from persona;
