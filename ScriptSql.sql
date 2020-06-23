create database if not exists db_tasks;

use db_tasks;

create table if not exists tasks(
	id_task int not null auto_increment,
    primary key(id_task),
    title varchar(50) not null,
    description varchar(300) not null,
    color varchar(10) not null,
    statu varchar(50) not null
);

insert into tasks(title, description, color, statu) 
values('Primera tarea', 'Probando la base de datos', '#fff', 'active');

select * from tasks;

truncate tasks;