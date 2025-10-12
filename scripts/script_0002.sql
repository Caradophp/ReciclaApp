create table endereco (
	id_endereco serial not null,
	bairro varchar(100) not null,
	rua varchar(50) not null,
	numero varchar(50) not null,
	id_usuario int not null
);

alter table usuarios add constraint pk_id_usuario primary key (id_usuario);

alter table endereco add constraint pk_id_endereco primary key (id_endereco);
alter table endereco add constraint fk_usuario_endereco foreign key (id_usuario) references usuarios (id_usuario);

insert into endereco (bairro, rua, numero, id_usuario)
values ('Floresta', 'Rua das palmeiras', '123', 2);