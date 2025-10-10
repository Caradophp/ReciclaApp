create type tipo_de_usuario as enum ('COMUM', 'COLETOR');

create table usuarios (
	id_usuario serial not null,
	nome varchar(100) not null,
	email varchar(150) not null unique,
	senha varchar(70) not null,
	tipo_usuario tipo_de_usuario not null,
	img varchar(50) null
);

insert into usuarios (nome, email, senha, tipo_usuario, img) values 
('Coletor', 'coletor@mail.com', '123', 'COLETOR', null),
('Comum', 'comum@mail.com', '123', 'COMUM', null);
	   
