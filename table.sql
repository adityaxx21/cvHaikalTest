CREATE TABLE users (
   id INT AUTO_INCREMENT NOT NULL AUTO_INCREMENT,
   username varchar(255) NOT NULL,
   full_name varchar(255) NOT NULL,
   dateCreated datetime NOT NULL,
   dateModified datetime NOT NULL,
   PRIMARY KEY (id),
   UNIQUE (username)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE discount (
   id INT AUTO_INCREMENT NOT NULL AUTO_INCREMENT,
   disc double NOT NULL,
   tax double NOT NULL,
   type enum('distance','orders') NOT NULL,
   value INT NOT NULL,
   PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE transaction (
   id INT AUTO_INCREMENT NOT NULL AUTO_INCREMENT,
   user_id INT NOT NULL,
   value double NOT NULL,
   distance INT NOT NULL,
   discount_id INT DEFAULT NULL,
   PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
