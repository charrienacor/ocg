CREATE TABLE Counselors(
    Counselor_Email VARCHAR(30) NOT NULL UNIQUE,
    First_Name VARCHAR (30) NOT NULL,
    Middle_Name VARCHAR (30),
    Last_Name VARCHAR (30),
    PRIMARY KEY (Email),
);


INSERT INTO Counselors
VALUES
('lester.ignacio1209@gmail.com', 'Lester', '', 'Ignacio');