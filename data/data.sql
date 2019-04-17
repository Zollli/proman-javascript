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
	ord integer,
	PRIMARY KEY (id),
	FOREIGN KEY(board_id) REFERENCES "boards"(id),
	FOREIGN KEY(status_id) REFERENCES "statuses"(id)
);

insert into users(name, hashed_password) VALUES('proman','proman');
insert into boards(user_id, title) VALUES (1,'Sprint Plan 5th TW week');
insert into boards(user_id, title) VALUES (1,'Future');
insert into statuses(title) values ('new');
insert into statuses(title) values ('in progress');
insert into statuses(title) values ('testing');
insert into statuses(title) values ('done');
insert into cards(board_id, title, status_id) VALUES (1,'Create a development environment BV:00',4);
insert into cards(board_id, title, status_id) VALUES (1,'List page BV:1000',4);
insert into cards(board_id, title, status_id) VALUES (1,'Create public board BV:400',4);
insert into cards(board_id, title, status_id) VALUES (1,'Static columns BV:300',4);
insert into cards(board_id, title, status_id) VALUES (1,'Change status BV:600',4);
insert into cards(board_id, title, status_id) VALUES (1,'User registration BV:700',4);
insert into cards(board_id, title, status_id) VALUES (1,'User login BV:700',4);
insert into cards(board_id, title, status_id) VALUES (1,'User logout BV:700',4);
insert into cards(board_id, title, status_id) VALUES (2,'Delete cards',1);
insert into cards(board_id, title, status_id) VALUES (2,'Delete boards',1);
insert into cards(board_id, title, status_id) VALUES (2,'Add card',1);
insert into cards(board_id, title, status_id) VALUES (2,'Add board',1);

