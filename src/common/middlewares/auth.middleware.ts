import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authorizeUser() {
  return async (req: Request, res: Response, next: NextFunction) => {
	  // cookie-parser가 만들어준 req.cookies 객체에서 username을 확인
    const { username } = req.cookies;
    if (username) {
      console.log(`[인증 성공] ${username}님, 환영합니다.`);
      next();
    } else {
      console.log("[인증 실패] 로그인이 필요합니다.");
      res
        .status(401)
        .send(
          '<script>alert("로그인이 필요합니다!");location.href="/api/v1/users/login";</script>',
        );
    }
  };
}

export function authenticateJWT() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        resultType: "FAILED",
        error: {
          errorCode: "AUTH_REQUIRED",
          message: "로그인이 필요합니다.",
          data: null,
        },
        data: null,
      });
    }

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({
        resultType: "FAILED",
        error: {
          errorCode: "INVALID_TOKEN_FORMAT",
          message: "토큰 형식이 올바르지 않습니다.",
          data: null,
        },
        data: null,
      });
    }

    try {
  console.log("받은 토큰:", token);
  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  );

  console.log("decoded:", decoded);

  (req as any).user = decoded;

  next();
} catch (err) {
  console.log("JWT ERROR:", err);
      return res.status(401).json({
        resultType: "FAILED",
        error: {
          errorCode: "INVALID_TOKEN",
          message: "유효하지 않은 토큰입니다.",
          data: null,
        },
        data: null,
      });
    }
  };
}