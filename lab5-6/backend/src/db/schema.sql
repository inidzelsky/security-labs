create table users (
    id uuid default gen_random_uuid(),
    email varchar(255),
    password varchar(255)
);

