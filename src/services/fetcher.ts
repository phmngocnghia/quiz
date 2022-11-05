/**
fetch api

json = awiat json

if not 200
  throw RequestFail

if 200
   return json

catch(err)
   throw RequestFail

 */
class NetworkError extends Error {
  constructor(response: Response) {
    // Need to pass `options` as the second parameter to install the "cause" property.
    super(
      `Network Error. path: ${response.url}, status: ${response.status}`,
      {}
    );
  }
}

export class Fetcher {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async query(pathName: string) {
    const res = await fetch(this.baseUrl + pathName, {
      method: "GET",
    });

    if (res.status !== 200) {
      throw new NetworkError(res);
    }

    try {
      const json = await res.json();
      return json;
    } catch (err) {
      throw err;
    }
  }
}

export const opentdbFetcher = new Fetcher("https://opentdb.com");
