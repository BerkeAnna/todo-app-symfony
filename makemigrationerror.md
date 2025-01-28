xampp ->
apache config: ;extension=pdo_mysql -> extension=pdo_mysql
mysql config: 3306

DATABASE_URL="mysql://root:@127.0.0.1:3306/todo_app?serverVersion=mariadb-10.4.32&charset=utf8mb4"

terminál: C:\xampp\mysql\bin\mysql -u root -p
        enter, mivel nincs jelszó
        Server version: 10.4.32-MariaDB mariadb.org binary distribution -- .envben átírni a verziót

php bin/console make:migration


de a mysql workbranche látszódik minden. mivel ehhez csatlakoztattam, csak mariadb-t használ

