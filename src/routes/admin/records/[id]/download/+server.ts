import { read } from '$app/server';
import templateFile from '$lib/server/template.pdf?url';
import { PDFDocument, rgb } from 'pdf-lib';
import { ObjectId, MongoClient } from 'mongodb';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	const client = new MongoClient("mongodb://localhost:27017");
	await client.connect();

	const data = await client.db("Aguhon").collection("BIS").findOne({
		_id: event.params.id
	});

	const pdfBytes = await read(templateFile).arrayBuffer();
	const pdfDoc = await PDFDocument.load(pdfBytes);

	const firstPage = pdfDoc.getPages()[0];
	const { width, height } = firstPage.getSize();
	const secondPage = pdfDoc.getPages()[1];

	// Customized color of text
	const red = 0 / 255;
	const green = 45 / 255;
	const blue = 179 / 255;

	// PRELIMINARIES ---------------------------------
	firstPage.drawText(data?.Semester?? 'N/A', {
		x: 250,
		y: height / 2 + 379,
		size: 10,
		color: rgb(red, green, blue)
	});

	firstPage.drawText(data?.School_Year?? 'N/A', {
		x: 340,
		y: height / 2 + 379,
		size: 10,
		color: rgb(red, green, blue)
	});

	firstPage.drawText(data?.Student_Number ?? 'N/A', {
		x: 250,
		y: height / 2 + 366,
		size: 10,
		color: rgb(red, green, blue)
	});

	firstPage.drawText(data?.Degree_Program?? 'N/A', {
		x: 379,
		y: height / 2 + 366,
		size: 10,
		color: rgb(red, green, blue)
	});

	// // PERSONAL INFORMATION --------------------------
	// firstPage.drawText(data?.Personal_Information.Student_Name?? 'N/A', {
	// 	x: 150,
	// 	y: height / 2 + 307,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Personal_Information.Nickname?? 'N/A', {
	// 	x: 105,
	// 	y: height / 2 + 281,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Personal_Information.Student_Sex?? 'N/A', {
	// 	x: 255,
	// 	y: height / 2 + 281,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Personal_Information.Student_Age?? 'N/A', {
	// 	x: 315,
	// 	y: height / 2 + 281,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Personal_Information.Birth_Date?? 'N/A', {
	// 	x: 460,
	// 	y: height / 2 + 281,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Personal_Information.Place_Of_Birth?? 'N/A', {
	// 	x: 110,
	// 	y: height / 2 + 267,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Personal_Information.Nationality?? 'N/A', {
	// 	x: 140,
	// 	y: height / 2 + 254,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Personal_Information.Citizenship?? 'N/A', {
	// 	x: 310,
	// 	y: height / 2 + 254,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Personal_Information.Religion?? 'N/A', {
	// 	x: 460,
	// 	y: height / 2 + 254,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Personal_Information.Baguio_Address?? 'N/A', {
	// 	x: 175,
	// 	y: height / 2 + 240,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Personal_Information.Baguio_Telephone_Number?? 'N/A', {
	// 	x: 490,
	// 	y: height / 2 + 240,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Personal_Information.Cellphone_Number?? 'N/A', {
	// 	x: 150,
	// 	y: height / 2 + 227,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Personal_Information.Email_Address?? 'N/A', {
	// 	x: 425,
	// 	y: height / 2 + 227,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Personal_Information.Permanent_Address?? 'N/A', {
	// 	x: 160,
	// 	y: height / 2 + 214,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Personal_Information.Permanent_Telephone_Number?? 'N/A', {
	// 	x: 490,
	// 	y: height / 2 + 214,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// // FAMILY DATA ------------------------------------
	// firstPage.drawText(data?.Family_Data.Guardian?? 'N/A', {
	// 	x: 200,
	// 	y: height / 2 + 162,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Family_Data.Guardian_Address?? 'N/A', {
	// 	x: 80,
	// 	y: height / 2 + 148,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Family_Data.Guardian_Telephone_Number?? 'N/A', {
	// 	x: 420,
	// 	y: height / 2 + 148,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// // FATHER
	// firstPage.drawText(data?.Family_Data.Father_Name?? 'N/A', {
	// 	x: 225,
	// 	y: height / 2 + 115,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Family_Data.Father_Age?? 'N/A', {
	// 	x: 225,
	// 	y: height / 2 + 101,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Family_Data.Father_Living_Or_Dead?? 'N/A', {
	// 	x: 225,
	// 	y: height / 2 + 87,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Family_Data.Father_Place_Of_Birth?? 'N/A', {
	// 	x: 225,
	// 	y: height / 2 + 73,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });
	
	// firstPage.drawText(data?.Family_Data.Father_Address?? 'N/A', {
	// 	x: 225,
	// 	y: height / 2 + 59,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Family_Data.Father_Contact_Number?? 'N/A', {
	// 	x: 225,
	// 	y: height / 2 + 45,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Family_Data.Father_Religion?? 'N/A', {
	// 	x: 225,
	// 	y: height / 2 + 31,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Family_Data.Father_Occupation?? 'N/A', {
	// 	x: 225,
	// 	y: height / 2 + 17,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Family_Data.Father_Monthly_Income?? 'N/A', {
	// 	x: 225,
	// 	y: height / 2 + 3,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Family_Data.Father_Employer_Name?? 'N/A', {
	// 	x: 225,
	// 	y: height / 2 - 12,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Family_Data.Father_Employer_Address?? 'N/A', {
	// 	x: 225,
	// 	y: height / 2 - 26,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Family_Data.Father_Highest_Degree_Completed?? 'N/A', {
	// 	x: 225,
	// 	y: height / 2 - 40,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Family_Data.Father_School?? 'N/A', {
	// 	x: 225,
	// 	y: height / 2 - 54,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Family_Data.Father_Languages?? 'N/A', {
	// 	x: 225,
	// 	y: height / 2 - 68,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// // Mother
	// firstPage.drawText(data?.Family_Data.Mother_Name?? 'N/A', {
	// 	x: 405,
	// 	y: height / 2 + 115,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Family_Data.Mother_Age?? 'N/A', {
	// 	x: 405,
	// 	y: height / 2 + 101,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Family_Data.Mother_Living_Or_Dead?? 'N/A', {
	// 	x: 405,
	// 	y: height / 2 + 87,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Family_Data.Mother_Place_Of_Birth?? 'N/A', {
	// 	x: 405,
	// 	y: height / 2 + 73,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });
	
	// firstPage.drawText(data?.Family_Data.Mother_Address?? 'N/A', {
	// 	x: 405,
	// 	y: height / 2 + 59,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Family_Data.Mother_Contact_Number?? 'N/A', {
	// 	x: 405,
	// 	y: height / 2 + 45,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Family_Data.Mother_Religion?? 'N/A', {
	// 	x: 405,
	// 	y: height / 2 + 31,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Family_Data.Mother_Occupation?? 'N/A', {
	// 	x: 405,
	// 	y: height / 2 + 17,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Family_Data.Mother_Monthly_Income?? 'N/A', {
	// 	x: 405,
	// 	y: height / 2 + 3,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Family_Data.Mother_Employer_Name?? 'N/A', {
	// 	x: 405,
	// 	y: height / 2 - 12,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Family_Data.Mother_Employer_Address?? 'N/A', {
	// 	x: 405,
	// 	y: height / 2 - 26,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Family_Data.Mother_Highest_Degree_Completed?? 'N/A', {
	// 	x: 405,
	// 	y: height / 2 - 40,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Family_Data.Mother_School?? 'N/A', {
	// 	x: 405,
	// 	y: height / 2 - 54,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Family_Data.Mother_Languages?? 'N/A', {
	// 	x: 405,
	// 	y: height / 2 - 68,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// // CHILLDREN IN THE FAMILY -------------------------

	// // Split names and draw each name on the PDF
	// function splitStrings(stringInput) {
	// 	const stringsArray = stringInput.split(',').map(name => name.trim());
	// 	return stringsArray;
	// }

	// const namesArray = splitStrings(data?.Children_in_the_Family.Name ?? '');
	// const sexArray = splitStrings(data?.Children_in_the_Family.Sex ?? '');
	// const ageArray = splitStrings(data?.Children_in_the_Family.Age ?? '');
	// const civilStatusArray = splitStrings(data?.Children_in_the_Family.Civil_Status ?? '');
	// const educAttainmentArray = splitStrings(data?.Children_in_the_Family.Educational_Attainment ?? '');
	// const occupationArray = splitStrings(data?.Children_in_the_Family.Occupation ?? '');
	// const residenceArray = splitStrings(data?.Children_in_the_Family.Residence ?? '');

	// let startY = height / 2 - 142; // Starting y position
    // const lineHeight = 15; // Line height for each row

    // // Loop through each array and print the details in columns
    // for (let i = 0; i < namesArray.length; i++) {
    //     firstPage.drawText(namesArray[i] ?? 'N/A', {
    //         x: 43,
    //         y: startY - (i * lineHeight),
    //         size: 10,
    //         color: rgb(red, green, blue)
    //     });

    //     firstPage.drawText(sexArray[i] ?? 'N/A', {
	// 		x: 185,
	// 		y: startY - (i * lineHeight),
	// 		size: 10,
	// 		color: rgb(red, green, blue)
    //     });

    //     firstPage.drawText(ageArray[i] ?? 'N/A', {
	// 		x: 220,
	// 		y: startY - (i * lineHeight),
	// 		size: 10,
	// 		color: rgb(red, green, blue)
    //     });

    //     firstPage.drawText(civilStatusArray[i] ?? 'N/A', {
	// 		x: 250,
	// 		y: startY - (i * lineHeight),
	// 		size: 10,
	// 		color: rgb(red, green, blue)
    //     });

	// 	firstPage.drawText(educAttainmentArray[i] ?? 'N/A', {
	// 		x: 300,
	// 		y: startY - (i * lineHeight),
	// 		size: 10,
	// 		color: rgb(red, green, blue)
	// 	});

	// 	firstPage.drawText(occupationArray[i] ?? 'N/A', {
	// 		x: 400,
	// 		y: startY - (i * lineHeight),
	// 		size: 10,
	// 		color: rgb(red, green, blue)
	// 	});

	// 	firstPage.drawText(residenceArray[i] ?? 'N/A', {
	// 		x: 490,
	// 		y: startY - (i * lineHeight),
	// 		size: 10,
	// 		color: rgb(red, green, blue)
	// 	});
	// }

	// // EDUCATIONAL BACKGROUND -------------------------
	// firstPage.drawText(data?.Educational_Background.Elementary_School?? 'N/A', {
	// 	x: 190,
	// 	y: height / 2 - 276,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Educational_Background.Elementary_School_Location?? 'N/A', {
	// 	x: 430,
	// 	y: height / 2 - 276,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Educational_Background.Junior_High_School?? 'N/A', {
	// 	x: 190,
	// 	y: height / 2 - 287,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// firstPage.drawText(data?.Educational_Background.Junior_High_School_Location?? 'N/A', {
	// 	x: 430,
	// 	y: height / 2 - 287,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// // SECOND PAGE STARTS HERE ------------------------
	
	// // EDUCATIONAL BACKGROUND CONTINUATION ------------
	// secondPage.drawText(data?.Educational_Background.Senior_High_School?? 'N/A', {
	// 	x: 190,
	// 	y: height / 2 + 444,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// secondPage.drawText(data?.Educational_Background.Senior_High_School_Location?? 'N/A', {
	// 	x: 430,
	// 	y: height / 2 + 444,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// secondPage.drawText(data?.Educational_Background.Honors?? 'N/A', {
	// 	x: 462,
	// 	y: height / 2 + 325,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// secondPage.drawText(data?.Educational_Background.Awards?? 'N/A', {
	// 	x: 170,
	// 	y: height / 2 + 315,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// secondPage.drawText(data?.Educational_Background.First_Campus?? 'N/A', {
	// 	x: 135,
	// 	y: height / 2 + 300,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// secondPage.drawText(data?.Educational_Background.First_Campus_Reason?? 'N/A', {
	// 	x: 350,
	// 	y: height / 2 + 300,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// secondPage.drawText(data?.Educational_Background.Second_Campus?? 'N/A', {
	// 	x: 145,
	// 	y: height / 2 + 290,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// secondPage.drawText(data?.Educational_Background.Second_Campus_Reason?? 'N/A', {
	// 	x: 350,
	// 	y: height / 2 + 290,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// // FINANCIAL INFORMATION --------------------------
	// secondPage.drawText(data?.Financial_Information.Other_Sources_Of_Income?? 'N/A', {
	// 	x: 370,
	// 	y: height / 2 + 187,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// secondPage.drawText(data?.Financial_Information.Allowance?? 'N/A', {
	// 	x: 440,
	// 	y: height / 2 + 171,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// secondPage.drawText(data?.Financial_Information.Specifics?? 'N/A', {
	// 	x: 340,
	// 	y: height / 2 + 145,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// secondPage.drawText(data?.Financial_Information.Other_Sources?? 'N/A', {
	// 	x: 310,
	// 	y: height / 2 + 133,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// secondPage.drawText(data?.Financial_Information.Second_Other_Sources_Of_Allowance?? 'N/A', {
	// 	x: 500,
	// 	y: height / 2 + 109,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// // VOCATIONAL PLANS -------------------------------
	// secondPage.drawText(data?.Vocational_Plans.Course?? 'N/A', {
	// 	x: 80,
	// 	y: height / 2 + 52,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// secondPage.drawText(data?.Vocational_Plans.Major?? 'N/A', {
	// 	x: 340,
	// 	y: height / 2 + 52,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// secondPage.drawText(data?.Vocational_Plans.Other_Course?? 'N/A', {
	// 	x: 450,
	// 	y: height / 2 - 48,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// secondPage.drawText(data?.Vocational_Plans.Other_No_Reasons?? 'N/A', {
	// 	x: 420,
	// 	y: height / 2 - 60,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// secondPage.drawText(data?.Vocational_Plans.Other_Yes_Reasons?? 'N/A', {
	// 	x: 155,
	// 	y: height / 2 - 72,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// secondPage.drawText(data?.Vocational_Plans.Second_No_Reasons?? 'N/A', {
	// 	x: 215,
	// 	y: height / 2 - 100,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// secondPage.drawText(data?.Vocational_Plans.Other_Future_Plans?? 'N/A', {
	// 	x: 370,
	// 	y: height / 2 - 150,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// // LEISURE TIME ACTIVITIES -------------------------
	// secondPage.drawText(data?.Leisure_Time_Activities.Recreational_Activities?? 'N/A', {
	// 	x: 170,
	// 	y: height / 2 - 197,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// secondPage.drawText(data?.Leisure_Time_Activities.Clubs_Joined?? 'N/A', {
	// 	x: 200,
	// 	y: height / 2 - 220,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// secondPage.drawText(data?.Leisure_Time_Activities.Clubs_To_Join?? 'N/A', {
	// 	x: 240,
	// 	y: height / 2 - 243,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// secondPage.drawText(data?.Leisure_Time_Activities.Interests?? 'N/A', {
	// 	x: 165,
	// 	y: height / 2 - 266,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// secondPage.drawText(data?.Leisure_Time_Activities.YesReading?? 'N/A', {
	// 	x: 300,
	// 	y: height / 2 - 289,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });

	// // CLOSING ESSAY ---------------------------------
	// secondPage.drawText(data?.Closing_Question.Dreams?? 'N/A', {
	// 	x: 50,
	// 	y: height / 2 - 350,
	// 	size: 10,
	// 	color: rgb(red, green, blue)
	// });


	return new Response(new Blob([await pdfDoc.save()], {type: 'application/pdf'}), {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': `attachment; filename*=UTF-8''${data?.Student_Number ?? 'N/A'}.pdf`
		}
	});
};