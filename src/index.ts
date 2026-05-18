// 1. 환경 변수 설정
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
import { AppError } from "./common/errors/app.error.js";
import express, { Express, Request, Response,NextFunction } from "express";
import cors from "cors";
import { RegisterRoutes } from "./generated/routes.js";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use((req: Request, res: Response, next: NextFunction) => {
  (res as any).error = function ({ errorCode = null, message = null, data = null }) {
    return this.json({
      resultType: "FAILED",
      error: { errorCode, message, data },
      data: null,
    });
  };
  next();
});
// 2. 미들웨어 설정

app.use(cors());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 3. 기본 라우트
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! This is TypeScript Server!");
});

// 4. TSOA가 자동 생성한 라우트 등록
const router = express.Router();

RegisterRoutes(router);

app.use("/api/v1", router);

console.log("TSOA routes mounted at /api/v1");

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  (res.status(err.statusCode || 500) as any).error({
    errorCode: err.errorCode || "unknown",
    message: err.message || String(err),
    data: err.data || null,
  });
});

// 5. 서버 시작
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});