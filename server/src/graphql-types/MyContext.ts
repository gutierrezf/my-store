import { Request, Response } from "express";

interface MySession extends Express.Session {
  userId: number // or any other type
}
interface MyRequest extends Request {
  session: MySession // or any other type
}
export interface MyContext {
  req: MyRequest;
  res: Response;
}
