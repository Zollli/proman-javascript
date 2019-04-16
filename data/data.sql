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
	PRIMARY KEY (id),
	FOREIGN KEY(board_id) REFERENCES "boards"(id),
	FOREIGN KEY(status_id) REFERENCES "statuses"(id)
);