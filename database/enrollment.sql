USE mysql;

-- BASE DE DATOS
DROP DATABASE IF EXISTS db_enrollment_vmm;
CREATE DATABASE db_enrollment_vmm;

USE db_enrollment_vmm;

-- TABLITAS
DROP TABLE IF EXISTS representative;
CREATE TABLE representative(
    code_representative INT(5) AUTO_INCREMENT,
    _name VARCHAR(50) NOT NULL,
    father_surname VARCHAR(25) NOT NULL,
    mother_surname VARCHAR(25) NOT NULL,
    dni CHAR(8) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phone CHAR(9) NOT NULL,
    UNIQUE (dni),
    PRIMARY KEY(code_representative)
);

DROP TABLE IF EXISTS student;
CREATE TABLE student(
    code_student INT(6) AUTO_INCREMENT,
    _name VARCHAR(50) NOT NULL,
    father_surname VARCHAR(25) NOT NULL,
    mother_surname VARCHAR(25) NOT NULL,
    date_of_birth DATE NOT NULL,
    dni CHAR(8) NOT NULL,
    direction VARCHAR(50) NOT NULL,
    code_representative INT(5) NOT NULL,
    active BIT NOT NULL,
    UNIQUE (dni),
    PRIMARY KEY(code_student),
    FOREIGN KEY (code_representative) REFERENCES representative(code_representative)
);

DROP TABLE IF EXISTS account;
CREATE TABLE account(
    code_account INT(10) AUTO_INCREMENT,
    _password CHAR(60) NOT NULL,
    code_student INT(6) NOT NULL,
    PRIMARY KEY(code_account),
    FOREIGN KEY (code_student) REFERENCES student(code_student)
);


DROP TABLE IF EXISTS bank;
CREATE TABLE bank(
    code_bank TINYINT(1) AUTO_INCREMENT,
    _name VARCHAR(50) NOT NULL,
    PRIMARY KEY (code_bank)
);


DROP TABLE IF EXISTS payment;
CREATE TABLE payment(
    code_payment INT(10) AUTO_INCREMENT,
    date_payment DATE NOT NULL,
    amount_payment DECIMAL(5,2) NOT NULL,
    code_bank TINYINT(1) NOT NULL,
    code_student INT(6) NOT NULL,
    PRIMARY KEY (code_payment),
    FOREIGN KEY (code_bank) REFERENCES bank(code_bank),
    FOREIGN KEY (code_student) REFERENCES student(code_student)
);

DROP TABLE IF EXISTS shift;
CREATE TABLE shift(
    code_shift TINYINT(1) AUTO_INCREMENT,
    category VARCHAR(6) NOT NULL,
    PRIMARY KEY (code_shift)
);


DROP TABLE IF EXISTS section;
CREATE TABLE section(
    code_section TINYINT(2) AUTO_INCREMENT,
    letter CHAR(1) NOT NULL,
    code_shift TINYINT(1) NOT NULL,
    PRIMARY KEY (code_section),
    FOREIGN KEY (code_shift) REFERENCES shift(code_shift)
);

DROP TABLE IF EXISTS teacher;
CREATE TABLE teacher(
    code_teacher INT(5) AUTO_INCREMENT,
    _name VARCHAR(50) NOT NULL,
    father_surname VARCHAR(25) NOT NULL,
    mother_surname VARCHAR(25) NOT NULL,
    PRIMARY KEY(code_teacher)
);

DROP TABLE IF EXISTS grade;
CREATE TABLE grade(
    code_grade TINYINT(1) AUTO_INCREMENT,
    name_grade VARCHAR(10) NOT NULL,
    PRIMARY KEY (code_grade)
);

DROP TABLE IF EXISTS course;
CREATE TABLE course(
    code_course INT(5) AUTO_INCREMENT,
    name_course VARCHAR(50) NOT NULL,
    code_grade TINYINT(1) NOT NULL,
    PRIMARY KEY(code_course),
    FOREIGN KEY (code_grade) REFERENCES grade(code_grade)
);

DROP TABLE IF EXISTS course_teacher;
CREATE TABLE course_teacher(
    code_course_teacher INT(5) AUTO_INCREMENT,
    code_teacher INT(5) NOT NULL,
    code_course INT(5) NOT NULL,
    PRIMARY KEY(code_course_teacher),
    FOREIGN KEY (code_teacher) REFERENCES teacher(code_teacher),
    FOREIGN KEY (code_course) REFERENCES course(code_course)
);

DROP TABLE IF EXISTS classroom;
CREATE TABLE classroom(
    code_classroom INT(3) AUTO_INCREMENT,
    code_section TINYINT(2) NOT NULL,
    code_grade TINYINT(1) NOT NULL,
    code_teacher INT(5) NOT NULL,
    PRIMARY KEY (code_classroom),
    FOREIGN KEY (code_section) REFERENCES section(code_section),
    FOREIGN KEY (code_grade) REFERENCES grade(code_grade),
    FOREIGN KEY (code_teacher) REFERENCES teacher(code_teacher)
);

DROP TABLE IF EXISTS classroom_vacancy;
CREATE TABLE classroom_vacancy(
    code_vacancy TINYINT(2) AUTO_INCREMENT,
    quantity TINYINT(2) NOT NULL,
    code_classroom INT(3) NOT NULL,
    PRIMARY KEY (code_vacancy),
    FOREIGN KEY (code_classroom) REFERENCES classroom(code_classroom)
);



DROP TABLE IF EXISTS enrollment;
CREATE TABLE enrollment(
    code_enrollment INT(10) AUTO_INCREMENT,
    date_enrollment DATE NOT NULL,
    repeater BIT,
    code_payment INT(10) NOT NULL,
    code_classroom INT(3) NOT NULL,
    PRIMARY KEY (code_enrollment),
    FOREIGN KEY (code_payment) REFERENCES payment(code_payment),
    FOREIGN KEY (code_classroom) REFERENCES classroom(code_classroom)
);

DROP TABLE IF EXISTS history_detail_student;
CREATE TABLE history_detail_student(
    code_history_detail_student INT(6) AUTO_INCREMENT,
    _repeat BIT,
    code_student INT(6) NOT NULL,
    code_grade TINYINT(1),
    PRIMARY KEY (code_history_detail_student),
    FOREIGN KEY (code_student) REFERENCES student(code_student),
    FOREIGN KEY (code_grade) REFERENCES grade(code_grade)
);

DROP TABLE IF EXISTS admin_account;
CREATE TABLE admin_account(
    code_admin_account TINYINT(1) AUTO_INCREMENT,
    _user VARCHAR(16) NOT NULL,
    _password CHAR(60) NOT NULL,
    PRIMARY KEY(code_admin_account)
);

DROP TABLE IF EXISTS activation_account_student;
CREATE TABLE activation_account_student(
    code_activation INT(6) AUTO_INCREMENT,
    code_student INT(6) NOT NULL,
    token CHAR(25) NOT NULL,
    plain_password VARCHAR(16) NOT NULL,
    PRIMARY KEY(code_activation),
    FOREIGN KEY(code_student) REFERENCES student(code_student)
);



-- INSERT DATA
INSERT INTO admin_account (_user,_password) VALUES('adminmaurtua','$2a$10$mWfaHhsfLfAQHPyW6/Ta8u4puOxwmnD5mWtBaMRisR6vuw.mLuxt2'); -- Admin123


INSERT INTO bank (_name) VALUES ('BBVA');
INSERT INTO bank (_name) VALUES ('BCP');

INSERT INTO grade (name_grade) VALUES ('PRIMERO');
INSERT INTO grade (name_grade) VALUES ('SEGUNDO');
INSERT INTO grade (name_grade) VALUES ('TERCERO');
INSERT INTO grade (name_grade) VALUES ('CUARTO');
INSERT INTO grade (name_grade) VALUES ('QUINTO');

INSERT INTO course (name_course,code_grade) VALUES ('Matemática - Primer año','1');
INSERT INTO course (name_course,code_grade) VALUES ('Comunicación - Primer año','1');
INSERT INTO course (name_course,code_grade) VALUES ('Idioma extranjero - Primer año','1');
INSERT INTO course (name_course,code_grade) VALUES ('Educación por el Arte - Primer año','1');
INSERT INTO course (name_course,code_grade) VALUES ('Ciencias Sociales - Primer año','1');
INSERT INTO course (name_course,code_grade) VALUES ('Persona, Familia y Relaciones Humanas - Primer año','1');
INSERT INTO course (name_course,code_grade) VALUES ('Educación Física - Primer año','1');
INSERT INTO course (name_course,code_grade) VALUES ('Educación Religiosa - Primer año','1');
INSERT INTO course (name_course,code_grade) VALUES ('Ciencia, Tecnología y Ambiente - Primer año','1');
INSERT INTO course (name_course,code_grade) VALUES ('Educación para el Trabajo - Primer año','1');

INSERT INTO course (name_course,code_grade) VALUES ('Matemática - Segundo año','2');
INSERT INTO course (name_course,code_grade) VALUES ('Comunicación - Segundo año','2');
INSERT INTO course (name_course,code_grade) VALUES ('Idioma extranjero - Segundo año','2');
INSERT INTO course (name_course,code_grade) VALUES ('Educación por el Arte - Segundo año','2');
INSERT INTO course (name_course,code_grade) VALUES ('Ciencias Sociales - Segundo año','2');
INSERT INTO course (name_course,code_grade) VALUES ('Persona, Familia y Relaciones Humanas - Segundo año','2');
INSERT INTO course (name_course,code_grade) VALUES ('Educación Física - Segundo año','2');
INSERT INTO course (name_course,code_grade) VALUES ('Educación Religiosa - Segundo año','2');
INSERT INTO course (name_course,code_grade) VALUES ('Ciencia, Tecnología y Ambiente - Segundo año','2');
INSERT INTO course (name_course,code_grade) VALUES ('Educación para el Trabajo - Segundo año','2');

INSERT INTO course (name_course,code_grade) VALUES ('Matemática - Tercer año','3');
INSERT INTO course (name_course,code_grade) VALUES ('Comunicación - Tercer año','3');
INSERT INTO course (name_course,code_grade) VALUES ('Idioma extranjero - Tercer año','3');
INSERT INTO course (name_course,code_grade) VALUES ('Educación por el Arte - Tercer año','3');
INSERT INTO course (name_course,code_grade) VALUES ('Ciencias Sociales - Tercer año','3');
INSERT INTO course (name_course,code_grade) VALUES ('Persona, Familia y Relaciones Humanas - Tercer año','3');
INSERT INTO course (name_course,code_grade) VALUES ('Educación Física - Tercer año','3');
INSERT INTO course (name_course,code_grade) VALUES ('Educación Religiosa - Tercer año','3');
INSERT INTO course (name_course,code_grade) VALUES ('Ciencia, Tecnología y Ambiente - Tercer año','3');
INSERT INTO course (name_course,code_grade) VALUES ('Educación para el Trabajo - Tercer año','3');

INSERT INTO course (name_course,code_grade) VALUES ('Matemática - Cuarto año','4');
INSERT INTO course (name_course,code_grade) VALUES ('Comunicación - Cuarto año','4');
INSERT INTO course (name_course,code_grade) VALUES ('Idioma extranjero - Cuarto año','4');
INSERT INTO course (name_course,code_grade) VALUES ('Educación por el Arte - Cuarto año','4');
INSERT INTO course (name_course,code_grade) VALUES ('Ciencias Sociales - Cuarto año','4');
INSERT INTO course (name_course,code_grade) VALUES ('Persona, Familia y Relaciones Humanas - Cuarto año','4');
INSERT INTO course (name_course,code_grade) VALUES ('Educación Física - Cuarto año','4');
INSERT INTO course (name_course,code_grade) VALUES ('Educación Religiosa - Cuarto año','4');
INSERT INTO course (name_course,code_grade) VALUES ('Ciencia, Tecnología y Ambiente - Cuarto año','4');
INSERT INTO course (name_course,code_grade) VALUES ('Educación para el Trabajo - Cuarto año','4');

INSERT INTO course (name_course,code_grade) VALUES ('Matemática - Quinto año','5');
INSERT INTO course (name_course,code_grade) VALUES ('Comunicación - Quinto año','5');
INSERT INTO course (name_course,code_grade) VALUES ('Idioma extranjero - Quinto año','5');
INSERT INTO course (name_course,code_grade) VALUES ('Educación por el Arte - Quinto año','5');
INSERT INTO course (name_course,code_grade) VALUES ('Ciencias Sociales - Quinto año','5');
INSERT INTO course (name_course,code_grade) VALUES ('Persona, Familia y Relaciones Humanas - Quinto año','5');
INSERT INTO course (name_course,code_grade) VALUES ('Educación Física - Quinto año','5');
INSERT INTO course (name_course,code_grade) VALUES ('Educación Religiosa - Quinto año','5');
INSERT INTO course (name_course,code_grade) VALUES ('Ciencia, Tecnología y Ambiente - Quinto año','5');
INSERT INTO course (name_course,code_grade) VALUES ('Educación para el Trabajo - Quinto año','5');


INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Luis Javier','Hernandez','Guerrero');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Cesia Dolly','Martinez','Vera');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Sul Ki','Ham','Orellana');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Ida Zuleyma','Bertolotti','Salcedo');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Lucia Jeanet','Mantari','Misaico');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Jose Mauricio','Quintana','Bernaola');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Johnny Alexis','Castillo','Mayuri');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Juana Almendra','Peña','Espino');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Luis Alonso','De los Rios','Hernandez');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Felix David','Cordova','Aparcana');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Jose Aldahir','Lengua','Muñoz');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Aldahir Jhunior','Solis','Gutiérrez');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Genesis Fabiola','Villagaray','Pecho');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Joseph Andre','Vizarreta','Vasquez');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Rodrigo Roberto','Martinez','Miranda');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Sthepanie Yennifer','Pizarro','Paredes');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Billy Andrew','Suarez','Matias');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Ebony Sthepanie','Jimenez','Ormeño');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Rosa Angela','Ipanaque','Carrasco');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Nagelly Geovanni','Osorio','Ramos');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Jose Daniel','Layseca','Guevara');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Fritcia Pamela','Roque','Espinoza');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Jesus Manuel','Varillas','Asencios');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Ivonne Sharon','Alvarez','Perez');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Ariana Dessire','Gutierrez','Tasayco');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Abel Fernando','Castañeda','Bertolotti');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Luis Anthony','Cordova','Perez');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Rodrigo Esthefano','Marquina','Huamani');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Ismael Alejandro','Mendoza','Gonzales');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Miguel Angel','Hiaroto','Espinoza');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Evelyn','Santos','Ramos');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Cesar William','Miranda','Tisoc');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Maily','Takayama','Alderete');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Carlos Alezander','Salvador','Almeyda');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Daniela Fernanda','Astorga','Bendezu');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Anibal Nehemias','Yauricasa','Ramos');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Shirley Katerin','Velasco','Taipe');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Rosa Lizbeth','Poma','Perales');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Cielo Luisa','Suarez','Saco');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Julio Cesar','Uribe','Cañedo');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Angel Gabriel','Gomez','Avalos');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Alvaro Nevari','Jurado','Hernandez');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Gino Kenny','Cruz','Marca');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Jens Andres','Castro','Diaz');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Marlo Cristiam','Achamizo','Pedraza');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Maria Angelica','Quispe','Campos');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Jean Pierre','Soto','Contreras');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Ismael Asmir','Garcia','Antonio');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Isidora Natividad','Cayo','Quijua');
INSERT INTO teacher (_name,father_surname,mother_surname) VALUES('Antny Wilder','Pacheco','Pariona');

INSERT INTO course_teacher(code_teacher,code_course) VALUES ('1','1');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('2','2');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('3','3');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('4','4');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('5','5');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('6','6');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('7','7');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('8','8');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('9','9');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('10','10');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('11','11');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('12','12');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('13','13');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('14','14');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('15','15');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('16','16');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('17','17');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('18','18');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('19','19');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('20','20');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('21','21');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('22','22');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('23','23');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('24','24');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('25','25');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('26','26');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('27','27');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('28','28');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('29','29');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('30','30');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('31','31');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('32','32');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('33','33');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('34','34');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('35','35');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('36','36');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('37','37');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('38','38');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('39','39');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('40','40');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('41','41');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('42','42');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('43','43');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('44','44');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('45','45');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('46','46');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('47','47');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('48','48');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('49','49');
INSERT INTO course_teacher(code_teacher,code_course) VALUES ('50','50');

INSERT INTO shift (category) VALUES ('MAÑANA');
INSERT INTO shift (category) VALUES ('TARDE');

INSERT INTO section (letter,code_shift) VALUES ('A','1');
INSERT INTO section (letter,code_shift) VALUES ('B','1');
INSERT INTO section (letter,code_shift) VALUES ('C','1');
INSERT INTO section (letter,code_shift) VALUES ('D','1');
INSERT INTO section (letter,code_shift) VALUES ('E','2');
INSERT INTO section (letter,code_shift) VALUES ('F','2');
INSERT INTO section (letter,code_shift) VALUES ('G','2');
INSERT INTO section (letter,code_shift) VALUES ('H','2');

INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('1','1','1');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('2','1','2');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('3','1','3');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('4','1','4');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('5','1','5');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('6','1','6');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('7','1','7');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('8','1','8');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('1','2','11');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('2','2','12');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('3','2','13');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('4','2','14');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('5','2','15');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('6','2','16');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('7','2','17');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('8','2','18');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('1','3','21');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('2','3','22');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('3','3','23');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('4','3','24');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('5','3','25');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('6','3','26');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('7','3','27');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('8','3','28');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('1','4','31');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('2','4','32');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('3','4','33');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('4','4','34');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('5','4','35');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('6','4','36');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('7','4','37');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('8','4','38');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('1','5','41');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('2','5','42');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('3','5','43');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('4','5','44');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('5','5','45');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('6','5','46');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('7','5','47');
INSERT INTO classroom(code_section,code_grade,code_teacher) VALUES('8','5','50');

INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','1');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','2');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','3');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','4');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','5');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','6');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','7');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','8');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','9');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','10');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','11');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','12');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','13');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','14');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','15');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','16');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','17');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','18');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','19');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','20');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','21');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','22');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','23');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','24');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','25');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','26');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','27');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','28');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','29');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','30');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','31');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','32');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','33');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','34');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','35');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','36');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','37');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','38');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','39');
INSERT INTO classroom_vacancy(quantity,code_classroom) VALUES('35','40');


INSERT INTO representative(_name,father_surname,mother_surname,dni,email,phone) VALUES('Juan Pablo','Carlos','Setien','78945612','juan_pablo@gmail.com','987654321');
INSERT INTO representative(_name,father_surname,mother_surname,dni,email,phone) VALUES('Doris Sofia','Huarcaya','Valverde','78945613','doris_valverde@gmail.com','987654322');
INSERT INTO representative(_name,father_surname,mother_surname,dni,email,phone) VALUES('Freddy','Gonzales','Hoo','78945614','Hoo_freddy@gmail.com','987654323');
INSERT INTO representative(_name,father_surname,mother_surname,dni,email,phone) VALUES('Manuel','Rivera','Becerra','78945615','Manuelitoy@gmail.com','987654324');
INSERT INTO representative(_name,father_surname,mother_surname,dni,email,phone) VALUES('Alexis','Arias','Sanchez','78945616','Alexin@gmail.com','987654325');
INSERT INTO representative(_name,father_surname,mother_surname,dni,email,phone) VALUES('Rene','Carrillo','Pereira','78945617','@gmail.com','987654326');
INSERT INTO representative(_name,father_surname,mother_surname,dni,email,phone) VALUES('Sancho','Panza','Pansita','78945618','@gmail.com','987654327');
INSERT INTO representative(_name,father_surname,mother_surname,dni,email,phone) VALUES('Pedro','Messi','Castro','78945619','@gmail.com','987654328');
INSERT INTO representative(_name,father_surname,mother_surname,dni,email,phone) VALUES('Maria','Perez','Ribeira','78945601','@gmail.com','987654329');
INSERT INTO representative(_name,father_surname,mother_surname,dni,email,phone) VALUES('Martha','Gordis','Nouns','78945602','@gmail.com','987654300');

INSERT INTO student(_name,father_surname,mother_surname,date_of_birth,dni,direction,code_representative,active) VALUES('Luis Aldair','Eto','Lucas','2008-01-20','77665501','Av. San Carlos #222','1','1');
INSERT INTO student(_name,father_surname,mother_surname,date_of_birth,dni,direction,code_representative,active) VALUES('Neymar Junior','Pele','Messi','2009-03-20','77665502','Av. San Miguel #152','2','1');
INSERT INTO student(_name,father_surname,mother_surname,date_of_birth,dni,direction,code_representative,active) VALUES('Leonel Jose','Zidane','Robinho','2008-02-14','77665503','Av. San Pollitos #265','3','1');
INSERT INTO student(_name,father_surname,mother_surname,date_of_birth,dni,direction,code_representative,active) VALUES('Manuel Junior','Rivera','Nose','2008-02-10','77665504','Av. Narnia #233','4','1');
INSERT INTO student(_name,father_surname,mother_surname,date_of_birth,dni,direction,code_representative,active) VALUES('Karen','Carlos','Pancha','2007-04-25','77665505','Av. Quito #123','5','1');
INSERT INTO student(_name,father_surname,mother_surname,date_of_birth,dni,direction,code_representative,active) VALUES('Vania','Danfris','Ratona','2006-05-22','77665506','Av. San clemente #111','6','1');
INSERT INTO student(_name,father_surname,mother_surname,date_of_birth,dni,direction,code_representative,active) VALUES('Penita','Dorada','Tijuan','2008-01-18','77665507','Calle Los Fiqus #77','7','1');
INSERT INTO student(_name,father_surname,mother_surname,date_of_birth,dni,direction,code_representative,active) VALUES('Luz','Bravo','Tintin','2007-03-15','77665508','Av. San Carlos #112','8','1');
INSERT INTO student(_name,father_surname,mother_surname,date_of_birth,dni,direction,code_representative,active) VALUES('Maria','Pia','tazo','2006-06-13','77665509','Urb. Portales #454','9','1');
INSERT INTO student(_name,father_surname,mother_surname,date_of_birth,dni,direction,code_representative,active) VALUES('Timoteo','Bacial','San','2007-06-21','77665500','Av. ','10','1');

INSERT INTO account(_password,code_student) VALUES('$2a$10$JmACanPS43pCL7ogvywlFOrGQyyUBivP6QIf1ly.GOpn/lq05tfWi','1'); -- Contralumno1
INSERT INTO account(_password,code_student) VALUES('$2a$10$M0uQXWkKGRyTlUEbKyV3XuStDaEpWeemF2iufG1E3gFS53Kf0JOtq','2'); -- Elcrack123
INSERT INTO account(_password,code_student) VALUES('$2a$10$4TrzP1PO7r.AyADNtNCNHOMh4HoKbgJx.XvTns/6ShlH/ZEuTR6GC','3'); -- Manolin123
INSERT INTO account(_password,code_student) VALUES('$2a$10$PAv1hV9XhnW3pcFuFJCiOeybUu2tpXky74VOChQBeyh.oNPEITQTi','4'); -- Yupi1234
INSERT INTO account(_password,code_student) VALUES('$2a$10$h/5M2pBVsFrXHgjMiEEU3ebnUboaa2KRUYwHEtLGaSVoCUgUhREB6','5'); -- Lolito123
INSERT INTO account(_password,code_student) VALUES('$2a$10$5Vptl84uQqALezKchV2bN.SBde2m6LpXCVix8nbSxI3agBC/7h09e','6'); -- Mancito123
INSERT INTO account(_password,code_student) VALUES('$2a$10$tT5tqLapJmgP3DPDInOwcuO.etK8MqkdJsEaSvTyKOH5yAeLxsnxa','7'); -- Maurtuano123
INSERT INTO account(_password,code_student) VALUES('$2a$10$8W66fCHDiJJ2lQg6LCF7ceVaNAzCUgQtHctZ6NeXaVnzG3ZlkZGRa','8'); -- Sanpedro123
INSERT INTO account(_password,code_student) VALUES('$2a$10$0DuG0Wtn48cbELSgzvzVHuKX9PZlAsbFXwXXILvHVhe4sfdARV9LO','9'); -- Sanpablo123
INSERT INTO account(_password,code_student) VALUES('$2a$10$VGk1JQvpVkrQx79wvdNRNOROWiSAF41liUum7clHuy6nZkSLgypgq','10'); -- Lucas1234

INSERT INTO history_detail_student(_repeat,code_student,code_grade) VALUES(1,'1','1');
INSERT INTO history_detail_student(_repeat,code_student,code_grade) VALUES(0,'2','2');
INSERT INTO history_detail_student(_repeat,code_student,code_grade) VALUES(1,'3','3');
INSERT INTO history_detail_student(_repeat,code_student,code_grade) VALUES(NULL,'4',NULL);
INSERT INTO history_detail_student(_repeat,code_student,code_grade) VALUES(1,'5','4');
INSERT INTO history_detail_student(_repeat,code_student,code_grade) VALUES(1,'6','5');
INSERT INTO history_detail_student(_repeat,code_student,code_grade) VALUES(1,'7','1');
INSERT INTO history_detail_student(_repeat,code_student,code_grade) VALUES(NULL,'8',NULL);
INSERT INTO history_detail_student(_repeat,code_student,code_grade) VALUES(0,'9','5');
INSERT INTO history_detail_student(_repeat,code_student,code_grade) VALUES(0,'10','2');

INSERT INTO payment(date_payment,amount_payment,code_bank,code_student) VALUES('2022-01-20','50.60','1','1');
INSERT INTO payment(date_payment,amount_payment,code_bank,code_student) VALUES('2022-01-21','50.60','2','2');
INSERT INTO payment(date_payment,amount_payment,code_bank,code_student) VALUES('2022-01-21','50.60','1','3');

INSERT INTO payment(date_payment,amount_payment,code_bank,code_student) VALUES('2022-01-22','50.60','1','4');
INSERT INTO payment(date_payment,amount_payment,code_bank,code_student) VALUES('2022-01-20','50.60','2','5');
INSERT INTO payment(date_payment,amount_payment,code_bank,code_student) VALUES('2022-01-22','50.60','1','6');
INSERT INTO payment(date_payment,amount_payment,code_bank,code_student) VALUES('2022-01-21','50.60','1','7');
INSERT INTO payment(date_payment,amount_payment,code_bank,code_student) VALUES('2022-01-21','50.60','2','8');


-- Procedures


DROP PROCEDURE IF EXISTS sp_verify_account_student;
DELIMITER //
CREATE PROCEDURE sp_verify_account_student(
    IN __dni_student CHAR(8)
)
BEGIN
    DECLARE __password CHAR(60);
    DECLARE __active BIT;
    SET __password = (  SELECT _password 
                        FROM student 
                        INNER JOIN account ON student.code_student = account.code_student 
                        WHERE student.dni = __dni_student );
	SET __active = (SELECT active FROM student WHERE student.dni= __dni_student);
    SELECT IF (__password IS NULL OR __active = 0, 'ERROR', __password) AS 'RES';                      
END//

DROP PROCEDURE IF EXISTS sp_get_detail_classroom;
DELIMITER //
CREATE PROCEDURE sp_get_detail_classroom(
    IN __code_grade TINYINT(1)
)
BEGIN
    SELECT  section.code_section,
            section.letter, 
            classroom_vacancy.quantity, 
            shift.category 
            FROM shift
                INNER JOIN section
            ON shift.code_shift = section.code_shift
                INNER JOIN classroom
            ON section.code_section = classroom.code_section
                INNER JOIN classroom_vacancy
            ON classroom.code_classroom = classroom_vacancy.code_classroom
                INNER JOIN grade
            ON classroom.code_grade = grade.code_grade
                WHERE classroom.code_grade = __code_grade;
END//

DROP PROCEDURE IF EXISTS sp_get_detail_student;
DELIMITER //
CREATE PROCEDURE sp_get_detail_student(
    IN __dni_student CHAR(8)
)
BEGIN
    SELECT  code_student, 
            _name,
            father_surname,
            mother_surname
    FROM student
    WHERE student.dni = __dni_student;
END//

DROP PROCEDURE IF EXISTS sp_verify_payment_student;
DELIMITER //
CREATE PROCEDURE sp_verify_payment_student(
    IN __code_student INT(6)
)
BEGIN
    DECLARE __verify_student BIT;
    SET __verify_student = (  SELECT 1 FROM payment WHERE payment.code_student = __code_student );  
    SELECT IF (__verify_student IS NULL, 0, 1) AS 'RES';
END//

DROP PROCEDURE IF EXISTS sp_verify_grade_student;
DELIMITER //
CREATE PROCEDURE sp_verify_grade_student(
    IN __code_student INT(6)
)
BEGIN
    DECLARE __code_grade TINYINT(1);
    DECLARE __repeater BIT; 
    SET __repeater = (  SELECT _repeat FROM history_detail_student WHERE history_detail_student.code_student = __code_student );
    SET __code_grade= (  SELECT code_grade FROM history_detail_student WHERE history_detail_student.code_student = __code_student );   
    SELECT IF (__code_grade = 5 AND __repeater = 0 , 0, 1) AS 'RES';
END//

DROP PROCEDURE IF EXISTS sp_verify_enrollment;
DELIMITER //
CREATE PROCEDURE sp_verify_enrollment(
    IN __code_student INT(6)
)
BEGIN
	DECLARE __verify_code_student INT(6);
    SET __verify_code_student = (   SELECT code_student FROM payment
                                    INNER JOIN enrollment
                                        ON payment.code_payment = enrollment.code_payment
                                    WHERE payment.code_student = __code_student); 
    SELECT IF (__verify_code_student IS NULL,1,0) AS 'RES';
END//


DROP PROCEDURE IF EXISTS sp_get_grade_to_enrollment;
DELIMITER //
CREATE PROCEDURE sp_get_grade_to_enrollment(
    IN __code_student INT(6)
)
BEGIN
    DECLARE __repeater BIT; 
    DECLARE __code_grade TINYINT(1);
    DECLARE __name_grade VARCHAR(10);  
    SET __repeater = (  SELECT _repeat FROM history_detail_student WHERE history_detail_student.code_student = __code_student );
    SET __code_grade = (  SELECT code_grade FROM history_detail_student WHERE history_detail_student.code_student = __code_student );
    SET __name_grade = (  SELECT name_grade FROM grade WHERE grade.code_grade = __code_grade );
    SELECT IF (__code_grade IS NULL, 1, IF (__repeater = 1, __code_grade, __code_grade+1 ) ) AS 'code_grade',IF (__name_grade IS NULL, 'PRIMERO', __name_grade ) AS 'name_grade';
END//



DROP PROCEDURE IF EXISTS sp_do_enrollment;
DELIMITER //
CREATE PROCEDURE sp_do_enrollment(
    IN __code_student INT(6),
    IN __code_grade TINYINT(1),
    IN __code_section TINYINT(2)
)
BEGIN
    DECLARE __repeater BIT;
    DECLARE __code_payment INT(10);
    DECLARE __code_classroom INT(3);
    DECLARE __quantity TINYINT(2);
    SET __repeater = (  SELECT _repeat 
                        FROM history_detail_student 
                        WHERE history_detail_student.code_student = __code_student );
    SET __code_payment = (  SELECT code_payment 
                            FROM payment 
                            WHERE payment.code_student = __code_student );
    SET __code_classroom = (     SELECT code_classroom 
                                FROM classroom 
                                WHERE classroom.code_section = __code_section AND classroom.code_grade = __code_grade);
    INSERT INTO enrollment(date_enrollment,repeater,code_payment,code_classroom) VALUES(CURDATE(),__repeater,__code_payment,__code_classroom);
    SET __quantity = (  SELECT quantity 
                        FROM classroom_vacancy 
                        WHERE classroom_vacancy.code_classroom = __code_classroom);
    UPDATE classroom_vacancy SET quantity = __quantity-1 WHERE classroom_vacancy.code_classroom = __code_classroom;
    SELECT 'SUCCESSFULLY' AS 'RES';
END//

DROP PROCEDURE IF EXISTS sp_get_detail_enrollment;
DELIMITER //
CREATE PROCEDURE sp_get_detail_enrollment(
    IN __code_student INT(6)
)
BEGIN
    SELECT  student._name, 
            student.father_surname,
            student.mother_surname,
            student.dni,
            enrollment.code_enrollment,
            enrollment.date_enrollment,
            grade.name_grade,
            section.letter,
            shift.category,
            payment.code_payment        
            FROM student
                INNER JOIN payment
            ON student.code_student = payment.code_student
                INNER JOIN enrollment
            ON payment.code_payment = enrollment.code_payment
                INNER JOIN classroom
            ON enrollment.code_classroom = classroom.code_classroom
                INNER JOIN grade
            ON classroom.code_grade = grade.code_grade
                INNER JOIN section
            ON classroom.code_section = section.code_section
                INNER JOIN shift
            ON section.code_shift = shift.code_shift
                WHERE student.code_student = __code_student;
END//


DROP PROCEDURE IF EXISTS sp_get_form_teacher;
DELIMITER //
CREATE PROCEDURE sp_get_form_teacher(
    IN __code_student INT(6)
)
BEGIN
    SELECT  _name, 
            father_surname, 
            mother_surname 
    FROM teacher 
            INNER JOIN classroom
        ON teacher.code_teacher = classroom.code_teacher
            INNER JOIN enrollment
        ON classroom.code_classroom = enrollment.code_classroom
            INNER JOIN payment
        ON enrollment.code_payment = payment.code_payment
        WHERE payment.code_student = __code_student;       
END//

DROP PROCEDURE IF EXISTS sp_get_teacher_classroom;
DELIMITER //
CREATE PROCEDURE sp_get_teacher_classroom(
    IN __code_student INT(6)
)
BEGIN
    DECLARE __code_grade TINYINT(1);
    SET __code_grade = (SELECT code_grade 
                            FROM classroom 
                                INNER JOIN enrollment
                            ON classroom.code_classroom = enrollment.code_classroom
                                INNER JOIN payment
                            ON enrollment.code_payment = payment.code_payment
                            WHERE payment.code_student = __code_student);
    SELECT  course.name_course,
            teacher._name,
            teacher.father_surname,
            teacher.mother_surname
    FROM    course
            INNER JOIN  course_teacher
        ON course.code_course = course_teacher.code_course
            INNER JOIN teacher
        ON course_teacher.code_teacher = teacher.code_teacher 
        WHERE course.code_grade = __code_grade;       
END//


-- admin

DROP PROCEDURE IF EXISTS sp_get_register_student;
DELIMITER //
CREATE PROCEDURE sp_get_register_student(
    IN __limit_top INT(6),
    IN __amount INT(6)
)
BEGIN
    SELECT  
        code_student,
        dni,
        _name,
        father_surname,
        mother_surname,
        direction,
        date_of_birth,
        active
    FROM
        student
    LIMIT __limit_top,__amount;
END//

DROP PROCEDURE IF EXISTS sp_get_representative;
DELIMITER //
CREATE PROCEDURE sp_get_representative(
    IN __code_student INT(6)
)
BEGIN
    SELECT  
        representative.dni,
        representative._name,
        representative.father_surname,
        representative.mother_surname,
        representative.email,
        representative.phone
    FROM
        student
    INNER JOIN representative
        ON  student.code_representative = representative.code_representative 
    WHERE student.code_student = __code_student;
END//

DROP PROCEDURE IF EXISTS sp_get_representative_email_by_student_dni;
DELIMITER //
CREATE PROCEDURE sp_get_representative_email_by_student_dni(
    IN __dni CHAR(8) 
)
BEGIN
    DECLARE __code_student INT(6);
    SET __code_student = (SELECT code_student FROM student WHERE student.dni = __dni);
    SELECT  
        representative.email 
    FROM
        student
    INNER JOIN representative
        ON  student.code_representative = representative.code_representative 
    WHERE student.code_student = __code_student;
END//


DROP PROCEDURE IF EXISTS sp_get_amount_register_student;
DELIMITER //
CREATE PROCEDURE sp_get_amount_register_student()
BEGIN
    SELECT  count(*) AS 'RES' FROM student;
END//

DROP PROCEDURE IF EXISTS sp_update_student;
DELIMITER //
CREATE PROCEDURE sp_update_student(   
    IN __name VARCHAR(50), 
    IN __father_surname VARCHAR(25), 
    IN __mother_surname VARCHAR(25), 
    IN __date_of_birth DATE,
    IN __dni CHAR(8), 
    IN __direction VARCHAR(50),
    IN __active BIT,
    IN __code_student INT(6)
) 
BEGIN
    DECLARE __verify_dni CHAR(8);
    SET __verify_dni = (SELECT 1 FROM student WHERE student.dni = __dni);
    IF __verify_dni IS NOT NULL THEN
        SELECT 'EXI_DNI' AS 'RES';
    ELSE
        UPDATE student 
        SET
            _name = CASE WHEN __name IS NOT NULL THEN __name ELSE _name END, 
            father_surname = CASE WHEN __father_surname IS NOT NULL THEN __father_surname ELSE father_surname END,
            mother_surname = CASE WHEN __mother_surname IS NOT NULL THEN __mother_surname ELSE mother_surname END,
            date_of_birth = CASE WHEN __date_of_birth IS NOT NULL THEN __date_of_birth ELSE date_of_birth END,
            dni = CASE WHEN __dni IS NOT NULL THEN __dni ELSE dni END, 
            direction = CASE WHEN __direction IS NOT NULL THEN __direction ELSE direction END,
            active = CASE WHEN __active IS NOT NULL THEN __active ELSE active END
        WHERE student.code_student= __code_student;
        SELECT 'SUCCESS' AS 'RES';
    END IF;
END
//

-- CALL sp_update_student(null,null,null,null,'77665502',null,null,1);

DROP PROCEDURE IF EXISTS sp_insert_student;
DELIMITER //
CREATE PROCEDURE sp_insert_student(
    IN __name VARCHAR(50), 
    IN __father_surname VARCHAR(25), 
    IN __mother_surname VARCHAR(25), 
    IN __date_of_birth DATE,
    IN __dni CHAR(8), 
    IN __direction VARCHAR(50),
    IN __dni_representative CHAR(8)
) 
BEGIN
    DECLARE __verify_dni_representative BIT;
    DECLARE __verify_dni BIT;
    DECLARE __code_representative INT(5);
    SET __verify_dni_representative = (SELECT 1 FROM representative WHERE representative.dni = __dni_representative);
    IF __verify_dni_representative IS NULL THEN 
        SELECT "REP_NOT_EXI" AS 'RES';
    ELSE
        SET __verify_dni = (SELECT 1 FROM student WHERE student.dni = __dni);
        SET __code_representative = (SELECT code_representative FROM representative WHERE representative.dni = __dni_representative);
        IF __verify_dni IS NULL THEN
            INSERT INTO student(_name,father_surname,mother_surname,date_of_birth,dni,direction,code_representative,active) VALUES(__name,__father_surname,__mother_surname,convert(__date_of_birth,DATE),__dni,__direction,__code_representative,0);
            SELECT 'SUCCESS' AS 'RES';
        ELSE
            SELECT 'STU_EXI' AS 'RES';
        END IF;
    END IF;
END
//

-- CALL sp_insert_student('Joel','Ccaico','Gonzales','2008-02-01','11111111','AV.  narnia','78945617')

DROP PROCEDURE IF EXISTS sp_insert_representative;
DELIMITER //
CREATE PROCEDURE sp_insert_representative(
    IN __name VARCHAR(50), 
    IN __father_surname VARCHAR(25), 
    IN __mother_surname VARCHAR(25), 
    IN __dni CHAR(8), 
    IN __email VARCHAR(50),
    IN __phone CHAR(9)
)   
BEGIN
    DECLARE __verify_dni BIT;
    SET __verify_dni = (SELECT 1 FROM representative WHERE representative.dni = __dni);
    IF __verify_dni IS NULL THEN
        INSERT INTO representative(_name,father_surname,mother_surname,dni,email,phone) VALUES(__name,__father_surname,__mother_surname,__dni,__email,__phone);
        SELECT 'SUCCESS' AS 'RES';
    ELSE
        SELECT 'REP_EXI' AS 'RES';
    END IF;
END
//
-- CALL sp_insert_representative('Juan','Soto','Ccaccc','78945655','juan_soto@gmail.com','987654000')


DROP PROCEDURE IF EXISTS sp_verify_account_admin;
DELIMITER //
CREATE PROCEDURE sp_verify_account_admin(
    IN __user VARCHAR(16)
) 
BEGIN
    DECLARE __verify_user BIT;
    DECLARE __password CHAR(60);
    SET __verify_user = (SELECT 1 FROM admin_account WHERE admin_account._user = __user);
    SET __password = (SELECT _password FROM admin_account WHERE admin_account._user = __user);
    SELECT IF(__verify_user IS NULL,'ERROR',__password) AS 'RES';
END
//

DROP PROCEDURE IF EXISTS sp_do_account_student;
DELIMITER //
CREATE PROCEDURE sp_do_account_student(
    IN __dni CHAR(8),
    IN __token CHAR(25),
    IN __encrypted_password CHAR(60),
    IN __plain_password VARCHAR(16)
) 
BEGIN
    DECLARE __code_student INT(6);
    SET __code_student = (SELECT code_student FROM student WHERE student.dni = __dni);
    INSERT INTO account(_password,code_student) VALUES(__encrypted_password,__code_student);
    INSERT INTO activation_account_student(token,plain_password,code_student) VALUES(__token,__plain_password,__code_student);
    SELECT 'SUCCESS' AS 'RES';
END
//

DROP PROCEDURE IF EXISTS sp_active_account_student;
DELIMITER //
CREATE PROCEDURE sp_active_account_student(
    IN __token CHAR(25)
) 
BEGIN
    DECLARE __verify_token BIT;
    DECLARE __code_student INT(6);
    DECLARE __plain_password VARCHAR(16);
    SET __verify_token = (SELECT 1 FROM activation_account_student WHERE activation_account_student.token = __token);
    IF __verify_token IS NOT NULL THEN
        SET __code_student = (SELECT code_student FROM activation_account_student WHERE activation_account_student.token = __token);
        UPDATE student SET active = 1 WHERE student.code_student = __code_student;
        SET __plain_password = (SELECT plain_password FROM activation_account_student WHERE activation_account_student.code_student = __code_student);
        DELETE FROM activation_account_student WHERE activation_account_student.code_student = __code_student;
        SELECT __plain_password AS 'plain_password', __code_student AS 'code_student';
    ELSE
        SELECT 'ERROR' AS 'RES';
    END IF;
END
//


-- CALL sp_do_account_student(10,'1234512345123451234512345','$2a$10$VGk1JQvpVkrQx79wvdNRNOROWiSAF41liUum7clHuy6nZkSLgypgq','Lucas1234');
-- CALL sp_active_account_student('1234512345123451234512345');



