create or replace procedure cad_user_address(
	nome varchar(50), 
	email varchar(100), 
	senha varchar(60),
	tipo_usuario varchar(60),
	id_rua bigint,
	numero varchar(10),
	img varchar(150) default null
) language plpgsql as
$$

declare 
	id int;

begin
	if (select 1 from endereco e where e.numero = $6 limit 1) is null then
		insert into endereco (id_rua, numero) values ($5, $6) returning id_endereco into id;
	else
		select id_endereco into id from endereco e where e.numero = $6;
	end if;

	insert into usuarios (nome, email, senha, tipo_usuario, img, id_endereco)
	values ($1, $2, $3, $4, $7, id);
end;
$$;