create type status_solicitacao as enum ('PENDENTE', 'A CAMINHO', 'COLETADO');

create table solicitacoes (
	id_solicitacao serial not null,
	status status_solicitacao not null,
	id_usuario int null
);

alter table solicitacoes add constraint pk_id_solicitacao primary key (id_solicitacao);
alter table solicitacoes add constraint fk_usuario_solicitacao foreign key (id_usuario) references usuarios (id_usuario);