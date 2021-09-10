CREATE TABLE items (
    id TEXT PRIMARY KEY,
    image_url TEXT,
    title TEXT,
    description TEXT,
    artist TEXT
);

INSERT INTO items VALUES(
    'ba00e8a4-90a6-4ff0-850d-90d1e224402f', 
    'https://images.squarespace-cdn.com/content/v1/5ebad749d483617950baa507/1604671323607-4DO2MA8M1L5XN4TWFIOA/ke17ZwdGBToddI8pDm48kLIDLBp5z4LZxwf0D5pzcXp7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmHHRMqniMJbuwH8EZRFFu5caYSaGKInkGFgQ52gStTVsfqlcOgesUaAnSJBL_2MmH/Summer.2020.007.jpg?format=750w',
    'Summer 2020 007',
    'Print of mixed media painting, Summer 2020 007. Printed on heavyweight 100% cotton hot press paper with archival pigment inks.  Each print is signed on the back so you can orient the piece however you like. ',
    'Rose Weselmann'
    );

INSERT INTO items VALUES(
    '11a336f6-d875-442e-8220-b08dd976f793', 
    'https://images.squarespace-cdn.com/content/v1/5ebad749d483617950baa507/1589380633767-WDJJNNSWYGLL7W5XYSY9/ke17ZwdGBToddI8pDm48kHWJhM5OumnWkn-bJp56T597gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UcL9jD0a5X9v0pRv3bkEBlbMdRGmLpxxWT_kpX2tG1kWONPeA8knsC0EEyRnv-0ugw/004.jpg?format=750w',
    '2019.032.Untitled Print',
    'Print of mixed media painting, 2019.032.Untitled Print. Printed on heavyweight 100% cotton hot press paper with archival pigment inks.  Each print is signed on the back so you can orient the piece however you like. ',
    'Rose Weselmann'
    );

INSERT INTO items VALUES(
    '92e1fa73-d830-4842-8942-cf192fa05a4b',
    'https://images.squarespace-cdn.com/content/v1/5ebad749d483617950baa507/1604670974260-EMOVJYJF9CTZ7E6HIT2W/ke17ZwdGBToddI8pDm48kLIDLBp5z4LZxwf0D5pzcXp7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmHHRMqniMJbuwH8EZRFFu5caYSaGKInkGFgQ52gStTVsfqlcOgesUaAnSJBL_2MmH/Summer.2020.001.small.jpg?format=500w',
    'Summer.2020.001 Print',
    'Print of mixed media painting, Summer.2020.001. Printed on heavyweight 100% cotton hot press paper with archival pigment inks.  Each print is signed on the back so you can orient the piece however you like. ',
    'Rose Weselmann'
    );

INSERT INTO items VALUES(
    '4552794f-db53-40be-a39d-6cc09cd37fe9',
    'https://images.squarespace-cdn.com/content/v1/5ebad749d483617950baa507/1589381917746-MGDS33I26LWV9T6IN8WD/ke17ZwdGBToddI8pDm48kH-NTu5of1wUeVVfTOIw5Ll7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1US8vG9N9LUAOa-7oqQJx3Aj4qdCZLDdCQGjAVkuqI_H3tP5em5xMxOQsKJAmH2x2lQ/2019.028.Untitled.jpg?format=500w',
    '2019.028.Untitled Print',
    'Print of mixed media painting, 2019.028.Untitled. Printed on heavyweight 100% cotton hot press paper with archival pigment inks.  Each print is signed on the back so you can orient the piece however you like. ',
    'Rose Weselmann'
    );

CREATE TABLE users (
    id TEXT PRIMARY KEY,
    username TEXT,
    email TEXT,
    password_hash TEXT,
    'role' TEXT DEFAULT 'member'
);

INSERT INTO users VALUES (
    '3b63130f-a49b-4556-9373-2abe2b62dd7a',
    'colettesmith',
    'colette@gmail.com',
    '$2y$10$L6rmaXPYadstY5wqhO64A.KT.Qy6apu/T2vINtXKcGHHJswSYc6.q',
    'admin'
);

CREATE TABLE favorites (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    item_id TEXT,
    UNIQUE(user_id, item_id)
);

INSERT INTO favorites VALUES (
    'b908505f-b41d-4827-bf23-fa2b8259d3ec',
    '3b63130f-a49b-4556-9373-2abe2b62dd7a',
    '11a336f6-d875-442e-8220-b08dd976f793'
);

INSERT INTO favorites VALUES (
    'c020b7a0-b4d1-4066-b543-f2e6f89c200f',
    '2370aac8-c856-426b-86d1-84d97939df22',
    '4552794f-db53-40be-a39d-6cc09cd37fe9'
);
