drop table if exists endereco cascade;
drop table if exists bairro cascade;
drop table if exists rua cascade;

create table if not exists bairro (
	id_bairro serial not null,
	nome varchar(100) not null unique
);

alter table bairro add constraint pk_id_bairro primary key (id_bairro);

create table if not exists rua (
	id_rua serial not null,
	nome varchar(100) not null,
	id_bairro int not null
);

alter table rua add constraint pk_id_rua primary key (id_rua);
alter table rua add constraint fk_rua_bairro foreign key (id_bairro) references bairro (id_bairro);

alter table usuarios add column id_endereco int null;

create table if not exists endereco (
	id_endereco serial not null,
	id_rua int null,
	numero varchar(10) not null
);

alter table endereco add constraint pk_id_endereco primary key (id_endereco);
alter table endereco add constraint fk_endereco_rua foreign key (id_rua) references rua (id_rua) on delete cascade;
alter table usuarios add constraint fk_usuario_endereco foreign key (id_endereco) references endereco (id_endereco) on delete cascade;
