MessageBoard
=======

MessageBoard repository



###Setup

Clone this repository:
```
$ git clone git@github.com:etingel/MessageBoard.git
```

Install dependencies:
```
$ cd MessageBoard
$ (sudo) npm install
```

Install the database server (all instructions aimed at Ubuntu. Installing PostgreSQL will differ by operating system):
```
$ sudo apt-get install postgresql
```

Connect to the newly installed Postgres server using the default `postgres` database. We will create a new user then
create the development and test databases. When prompted for a new password, use some password you can remember.
```
$ sudo -u postgres psql postgres
# \password postgres
# CREATE ROLE messageboard PASSWORD 'md5e6b6ca6251e4d90448cc3b55c99850dd' NOSUPERUSER NOCREATEDB NOCREATEROLE INHERIT LOGIN;
# create database messageboard;
# create database messageboardtest;
<Ctrl>-D
```

Now set up the schema for the development database (run this command from the MessageBoard repository directory):
```
$ node_modules/.bin/db-migrate up
```

If everything worked, you should be able to start the server by running:
```
$ nodejs app.js
```

Browse to `http://localhost:3000` to start using MessageBoard!

