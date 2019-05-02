drop table if exists cards;
drop table if exists statuses;
drop table if exists boards;
drop table if exists users;


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
insert into boards(user_id, title) VALUES (1,'A laposföld bebizonyítása');
insert into statuses(title) values ('Új Kísérletek');
insert into statuses(title) values ('Folyamatban Lévő Kísérletek');
insert into statuses(title) values ('Végső Tesztek');
insert into statuses(title) values ('Bebizonysodott');
insert into cards(board_id, title, status_id) VALUES (1,'Házi építésű rakétával kilőni kutatókat, hogy bebizonyítást nyerjen, a föld lapos.  BV:1500' ,4);
insert into cards(board_id, title, status_id) VALUES (1,'Érzékszerveinkkel való megfigyelés(Nem látni,hogy görbül).  BV:1000',4);
insert into cards(board_id, title, status_id) VALUES (1,'A Nap kering a Föld körül.  BV:800',4);
insert into cards(board_id, title, status_id) VALUES (1,'Az Old Bedford River csatornán hajózni, ameddig az árbóc el nem tünik a horizonton.  BV:1500',4);
insert into cards(board_id, title, status_id) VALUES (1,'Cipő kopás elemzés',4);


