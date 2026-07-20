import { checkResponse } from "./helpers";

const API_KEY = "6469fdaad2704196af25662282899f6e";

export async function search(keyword) {
  const toDate = new Date();
  const fromDate = new Date(toDate.getDate() - 7);

  const to =
    String(toDate.getFullYear()) +
    "-" +
    String(toDate.getMonth()) +
    "-" +
    String(toDate.getDate());
  const from =
    String(fromDate.getFullYear()) +
    "-" +
    String(fromDate.getMonth()) +
    "-" +
    String(fromDate.getDate());

  const url = `http://newsapi.org/v2/everything?q=${keyword}&from=${from}&to=${to}&apiKey=${API_KEY}&pageSize=100`;

  try {
    const response = await fetch(url);

    return checkResponse(response);
  } catch (error) {
    return Promise.reject(error);
  }
}
