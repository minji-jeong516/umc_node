import { pool } from "../../../db.config.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";

// 가게 존재 여부 확인
export const findStoreById = async (storeId: number) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM store WHERE id = ?",
    [storeId]
  );

  return rows.length > 0;
};

// 리뷰 생성
export const createReview = async (
  userId: number,
  storeId: number,
  content: string,
  score: number
) => {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO review (user_id, store_id, content, score)
     VALUES (?, ?, ?, ?)`,
    [userId, storeId, content, score]
  );

  return result.insertId;
};