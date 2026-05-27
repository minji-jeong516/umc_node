// 1. 환경 변수 설정
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import passport from "passport";
import { googleStrategy, jwtStrategy } from "./auth.config.js";
dotenv.config();

import express, {
  Express,
  Request,
  Response,
  NextFunction,
} from "express";

import cors from "cors";
import fs from "fs";
import path from "path";
import swaggerUi from "swagger-ui-express";

import { AppError } from "./common/errors/app.error.js";
import { RegisterRoutes } from "./generated/routes.js";

const app: Express = express();
const port = process.env.PORT || 3000;
passport.use(googleStrategy);
passport.use(jwtStrategy);

// 공통 에러 응답 함수
app.use((req: Request, res: Response, next: NextFunction) => {
  (res as any).error = function ({
    errorCode = null,
    message = null,
    data = null,
  }) {
    return this.json({
      resultType: "FAILED",
      error: {
        errorCode,
        message,
        data,
      },
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
app.use(passport.initialize());

// 3. 기본 라우트
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! This is TypeScript Server!");
});

// 4. Swagger 설정
const swaggerFile = JSON.parse(
  fs.readFileSync(path.resolve("dist/swagger.json"), "utf8")
);

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile)
);
app.get(
  "/oauth2/login/google",
  passport.authenticate("google", { session: false })
);

app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login-failed",
  }),
  (req, res) => {
    res.status(200).json({
      success: true,
      tokens: req.user,
    });
  }
);

// 5. TSOA 라우트 등록
const router = express.Router();
const isLogin = passport.authenticate("jwt", { session: false });

app.get("/mypage", isLogin, (req, res) => {
  res.status(200).json({
    message: "인증 성공!",
    user: req.user,
  });
});

RegisterRoutes(router);

app.use("/api/v1", router);

console.log("TSOA routes mounted at /api/v1");

// 6. 전역 에러 핸들러
app.use(
  (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error(err);

    if (res.headersSent) {
      return next(err);
    }

    (res.status(err.statusCode || 500) as any).error({
      errorCode: err.errorCode || "unknown",
      message: err.message || String(err),
      data: err.data || null,
    });
  }
);

// 7. 서버 시작
app.listen(port, () => {
  console.log(
    `[server]: Server is running at http://localhost:${port}`
  );

  console.log(
    `[swagger]: Swagger docs available at http://localhost:${port}/docs`
  );
});