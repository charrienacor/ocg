CREATE TABLE Appointments(
    Appointment_ID VARCHAR(12) NOT NULL UNIQUE,
    Student_Name VARCHAR(100) NOT NULL,
    Student_Email VARCHAR (30) NOT NULL,
    Student_ID INTEGER(9) NOT NULL,
    Counselor_Email VARCHAR(30) NOT NULL,
    Appointment_Date DATE NOT NULL,
    Appointment_Time TIME NOT NULL,
    Nature_Of_Concern VARCHAR(1000),
    Appointment_Status ENUM('Approved', 'Pending', 'Rejected', 'Completed'),
    PRIMARY KEY (Appointment_ID),
    FOREIGN KEY (Counselor_Email) REFERENCES Counselors(Counselor_Email)
);
