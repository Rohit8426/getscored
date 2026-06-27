import express from "express";
import { env } from "./config/env.js";
import { Page } from "./models/page.js";

export const app = express();

app.use(express.json());

app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", env.frontendOrigin);
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    response.sendStatus(204);
    return;
  }

  next();
});

app.get("/api/health", (_request, response) => {
  response.json({
    ok: true,
    service: "backend",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/site-config", (_request, response) => {
  response.json({
    siteName: env.siteName,
    frontendOrigin: env.frontendOrigin,
    adsEnabled: false,
  });
});

app.get("/api/pages", async (_request, response, next) => {
  try {
    const pages = await Page.findAll({
      order: [["createdAt", "DESC"]],
    });

    response.json({ pages });
  } catch (error) {
    next(error);
  }
});

app.post("/api/pages", async (request, response, next) => {
  try {
    const { title, slug, description } = request.body as {
      title?: string;
      slug?: string;
      description?: string;
    };

    if (!title || !slug || !description) {
      response.status(400).json({
        error: "title, slug, and description are required",
      });
      return;
    }

    const page = await Page.create({ title, slug, description });
    response.status(201).json({ page });
  } catch (error) {
    next(error);
  }
});

app.use(
  (
    error: unknown,
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(error);
    response.status(500).json({
      error: "Internal server error",
    });
  },
);
