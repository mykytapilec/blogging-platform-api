import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodTypeAny } from "zod";

export const validateRequest =
  (schema: ZodObject<any> | ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (err: any) {
      return res.status(400).json({ message: err.errors || err.message });
    }
  };