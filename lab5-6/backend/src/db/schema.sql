create table users (
    id uuid default gen_random_uuid() not null,
    email varchar(255),
    password varchar(255),
    constraint pk_user primary key(id),
);

create table user_phones (
    user_id uuid not null,
    phone varchar(255),
    constraint pk_user_phone primary key(user_id),
    constraint fk_user_phone_user foreign key (user_id) references users(id)
)