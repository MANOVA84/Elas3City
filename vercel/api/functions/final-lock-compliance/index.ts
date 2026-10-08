import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createHandler } from "@supabase/functions-edge";

const handler = createHandler(async (req: VercelRequest, res: VercelResponse) => {
  try {
    const supabaseReq = {
      method: req.method,
      headers: req.headers,
      body: req.body,
      query: req.query,
      params: req.params,
    };

    const resBody: any = {};
    const resHeaders: any = {};

    await handler(supabaseReq, {
      status: (code: number) => {
        res.statusCode = code;
        return res;
      },
      set: (key: string, value: string) => {
        resHeaders[key] = value;
        return this;
      },
      get: () => resHeaders,
      on: () => this,
      once: () => this,
      emit: () => this,
      listenerCount: () => 0,
    });

    res.status(res.statusCode).set(resHeaders).send(resBody);
  } catch (error) {
    console.error("Function error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default handler;