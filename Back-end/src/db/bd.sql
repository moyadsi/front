drop database if exists MetAnimation;
create database MetAnimation;
use MetAnimation;

CREATE TABLE Person (
    Id INT PRIMARY KEY,
    Name CHAR(50) NOT NULL,
    LastName CHAR(50) NOT NULL,
    Phone CHAR(30) DEFAULT '',
    Email CHAR(100) NOT NULL UNIQUE,
    Password CHAR(100) NOT NULL,
    Status BOOLEAN DEFAULT TRUE,
    Date DATETIME DEFAULT NOW(),
    Rol char(100) default 'User'
);

select * from person;


CREATE TABLE Company (
    Id_Company INT PRIMARY KEY auto_increment,
    NameCompany CHAR(200) DEFAULT '',
    PhoneCompany CHAR(50) DEFAULT '',
    EmailCompany CHAR(100) DEFAULT '',
    Addres CHAR(100) NOT NULL,
    PasswordCompany CHAR(100) NOT NULL,
    Date DATETIME DEFAULT NOW(),
    Id_Membreys INT,
    Id_Place INT,
    Id_Cities INT
);

CREATE TABLE Departament (
    Id_Departament INT PRIMARY KEY AUTO_INCREMENT,
    NamePlace CHAR(100) NOT NULL DEFAULT '',
    CONSTRAINT Fk_Departament_Company FOREIGN KEY (Id_Departament)
        REFERENCES Company (Id_Company)
);
 CREATE TABLE Cities (
    Id_Cities INT PRIMARY KEY AUTO_INCREMENT,
    NameCities CHAR(100) NOT NULL DEFAULT '',
    FOREIGN KEY (Id_Cities)
        REFERENCES Company (Id_Company)
);

CREATE TABLE Country (
    IdCountry INT AUTO_INCREMENT PRIMARY KEY,
    NameCountry CHAR(100),
    CountryCode INT NOT NULL,
    CountryPerson INT,
    CONSTRAINT Fk_CountryCode_Person FOREIGN KEY (CountryPerson)
        REFERENCES Person (Id)
);
/*----------------------------Cursos-----------------------------------*/

CREATE TABLE course (
    id_Course INT PRIMARY KEY
);

CREATE TABLE Category (
    Id_Category INT PRIMARY KEY AUTO_INCREMENT,
    NameCategory CHAR(255) NOT NULL,
    DescriptionCategory CHAR(255) NOT NULL,
    Status BOOLEAN DEFAULT TRUE,
    Date DATETIME DEFAULT NOW(),
    Id_Course INT,
    CONSTRAINT FK_Category_Course FOREIGN KEY (Id_course)
        REFERENCES Course (id_Course)
);
select * from Category;

CREATE TABLE ContentCourse (
    Id_Content INT PRIMARY KEY AUTO_INCREMENT,
    Description CHAR(255) NOT NULL,
    Duration CHAR(10) NOT NULL,
    Status BOOLEAN DEFAULT TRUE,
    Id_course INT,
    CONSTRAINT FK_Contentcourse_Course FOREIGN KEY (Id_course)
        REFERENCES Course (id_Course)
);

CREATE TABLE Teacher (
    Id_Teacher INT PRIMARY KEY,
    Experience CHAR(50) NOT NULL,
    Study CHAR(255) NOT NULL,
    Status BOOLEAN DEFAULT TRUE,
    Id_Course int ,
    CONSTRAINT FK_Teacher_Course FOREIGN KEY (Id_Course)
        REFERENCES course (id_Course),
    CONSTRAINT FK_Teacher_Person FOREIGN KEY (Id_Teacher)
        REFERENCES Person (Id)
);


/*Noticias*/

CREATE TABLE Noticies (
    Id INT PRIMARY KEY,
    Content CHAR(255),
    Fountain CHAR(255),
    Date DATETIME
);

CREATE TABLE Blog (
    Id INT PRIMARY KEY,
    Id_Company INT,
    Id_Noticies INT,
    Date DATETIME,
    Description CHAR(255),
    FOREIGN KEY (Id_Company)
        REFERENCES Company (Id_Company),
    FOREIGN KEY (Id_Noticies)
        REFERENCES Noticies (Id)
);

/*Certificado*/

CREATE TABLE Certificate (
    IdCertificate INT PRIMARY KEY,
    Id_User INT,
    Id_Course INT,
    Id_teacher INT,
    Date DATETIME
);

CREATE TABLE StudentCourse (
    Id INT PRIMARY KEY,
    Id_Student INT,
    Id_Course INT,
    Id_Certificate INT,
    CONSTRAINT FK_StudentCourse_Certificate FOREIGN KEY (Id_Certificate)
        REFERENCES Certificate (IdCertificate),
    CONSTRAINT FK_StudentCourse_Person FOREIGN KEY (Id_Student)
        REFERENCES Person (Id),
    CONSTRAINT FK_StudentCourse_Course FOREIGN KEY (Id_Course)
        REFERENCES course (id_Course)
);
/*Portafolio*/

CREATE TABLE Project (
    IdProject INT PRIMARY KEY,
    Recourse CHAR(255) NOT NULL,
    Format CHAR(255)
);

CREATE TABLE Briefcase (
    IdBriefcase INT PRIMARY KEY,
    Id_Company INT,
    Id_Project INT,
    FOREIGN KEY (Id_Company)
        REFERENCES Company (Id_Company),
    FOREIGN KEY (Id_Project)
        REFERENCES Project (IdProject)
);

CREATE TABLE Comment (
    IdComment INT PRIMARY KEY,
    IdBriefcase INT,
    qualification DOUBLE DEFAULT 5.0,
    description CHAR(255),
    FOREIGN KEY (IdBriefcase)
        REFERENCES Briefcase (IdBriefcase)
);

/*Membresia*/

CREATE TABLE Type (
    Id INT PRIMARY KEY,
    Descripction CHAR(255) default 'Free'
);

CREATE TABLE Membreys (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    IdType INT,
    IdCompany INT,
    CONSTRAINT FK_Membreys_User FOREIGN KEY (IdCompany)
        REFERENCES Company (Id_Company),
    CONSTRAINT FK_Membreys_Type FOREIGN KEY (IdType)
        REFERENCES Type (Id)
);

select * from type;
insert into Type values (1,'Free'),(2,'Advanced'),(3,'Premium');

/*Calificacion Cursos*/

CREATE TABLE qualification (
    Id INT PRIMARY KEY,
    IdCourse INT,
    Comment CHAR(255),
    qualification DOUBLE DEFAULT 5.0,
    FOREIGN KEY (IdCourse)
        REFERENCES course(id_Course)
);


/*Table Example*/
create table tb_user(
	id int not null auto_increment primary key,
    firstname varchar(50),
    lastname varchar(50),
    phone varchar(50),
    email varchar(50),
    accesscode varchar(50)
);


DELIMITER $$
CREATE PROCEDURE GetAllCourse()
BEGIN
    SELECT course.id_Course, Category.*,ContentCourse.*,Teacher.* 
    FROM course inner join Category inner join ContentCourse inner join Teacher;
END$$
DELIMITER ;

call GetAllCourse();

Delimiter $$
create procedure GetCourseElement(in Id int)
begin
	SELECT course.id_Course, Category.*,ContentCourse.*,Teacher.* 
    FROM course inner join Category inner join ContentCourse inner join Teacher where course.id_Course=Id;
end$$
delimiter ;

Delimiter $$
create procedure AddTeacher (in Id_Teacher1 int ,in Experience1 char(50), in Study1 char(255))
begin
	SET FOREIGN_KEY_CHECKS=0; 
	update Person set Rol = 'Profesor' where Id = Id_Teacher1;
	insert into Teacher (Id_Teacher,Experience,Study) values (Id_Teacher1,Experience1,Study1);
end $$

delimiter ;