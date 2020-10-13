import type { ClientRequest, ServerResponse } from "http";
import type { Day } from "./_types";

let today = 3;

export async function get(req: ClientRequest, res: ServerResponse, next) {
	res.setHeader("Content-Type", "application/json");

	res.end(
		JSON.stringify({
			today,
			history: [
				{ date: "Oct 20", score: 3 } as Day,
				{ date: "Oct 19", score: 2 } as Day
			]
		})
	);
}

export async function put(req: ClientRequest, res: ServerResponse, next) {
	res.setHeader("Content-Type", "application/json");

	req.on('data', function(chunk) {
		({today} = JSON.parse(chunk.toString()));
	});

	res.end(JSON.stringify({}));
}
