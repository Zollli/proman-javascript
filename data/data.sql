drop table if exists users;
drop table if exists boards;
drop table if exists statuses;
drop table if exists cards;

create table users (
	id SERIAL not null ,
	name varchar,
	hashed_password varchar,
	PRIMARY KEY (id)
);
create table boards(
	id SERIAL not null,
	user_id INTEGER,
	title varchar,
	PRIMARY KEY (id),
	FOREIGN KEY(user_id) REFERENCES "users"(id)
);
create table statuses(
	id SERIAL not null,
	title varchar,
	PRIMARY KEY (id)
);
create table cards(
	id SERIAL not null,
	board_id integer REFERENCES "boards" ON DELETE CASCADE ON UPDATE CASCADE,
	title varchar,
	status_id integer,
	order integer,
	PRIMARY KEY (id),
	FOREIGN KEY(board_id) REFERENCES "boards"(id),
	FOREIGN KEY(status_id) REFERENCES "statuses"(id)
);
insert into statuses(title) values ('new');
insert into statuses(title) values ('in progress');
insert into statuses(title) values ('testing');
insert into statuses(title) values ('done');

insert into users(name, hashed_password) VALUES('proman','proman');
insert into boards(user_id, title) VALUES (1,'Sprint Plan');
insert into cards(board_id, title, status_id) VALUES (1,'Create');

