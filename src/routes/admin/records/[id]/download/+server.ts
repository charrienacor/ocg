import { read } from '$app/server';
import templateFile from '$lib/server/template.pdf?url';
import { PDFDocument, rgb } from 'pdf-lib';
import { ObjectId, MongoClient } from 'mongodb';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	const client = new MongoClient("mongodb://localhost:27017");
	await client.connect();
	console.log(event.params.id);
	const data = await client.db("Aguhon").collection("BIS").findOne({
		_id: event.params.id
	});

	const pdfBytes = await read(templateFile).arrayBuffer();
	const pdfDoc = await PDFDocument.load(pdfBytes);

	const firstPage = pdfDoc.getPages()[0];
	// "Vocational_Plans": {
	// 	"Course"
	firstPage.drawText(data?._id ?? 'N/A', {
		x: 0,
		y: 0,
		size: 10,
		color: rgb(0, 0, 0)
	});

	return new Response(new Blob([await pdfDoc.save()], {type: 'application/pdf'}), {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': `attachment; filename*=UTF-8''${data?.Name}.pdf`
		}
	});
};