CREATE TABLE Counselors(
    Counselor_Email VARCHAR(30) NOT NULL UNIQUE,
    First_Name VARCHAR (30) NOT NULL,
    Middle_Name VARCHAR (30),
    Last_Name VARCHAR (30) NOT NULL,
    Suffix VARCHAR (30),
    Status ENUM('Active', 'Leave', 'Resigned'),
    PRIMARY KEY (Counselor_Email));


INSERT INTO Counselors
VALUES
('lester.ignacio1209@gmail.com', 'Lester', '', 'Ignacio', '', 'Active'),
('langiao@up.edu.ph', 'Liza', 'A.', 'Ngiao', 'RGC', 'Active'),
('apparcasio@up.edu.ph', 'Aurora', 'P.', 'Parcasio', 'RGC', 'Active'),
('jetuguinay@up.edu.ph', 'Julie', 'E.', 'Tuguinay', 'RGC', 'Active'),
('mpticag@up.edu.ph', 'Merjerie', 'P.', 'Ticag', '', 'Active');
