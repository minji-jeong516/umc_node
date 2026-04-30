import { pool } from "../../../db.config.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";

// 미션 존재 확인
export const findMissionById = async (missionId: number) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM mission WHERE id = ?",
    [missionId]
  );

  return rows.length > 0;
};

// 이미 도전 중인지 확인
export const findUserMission = async (
  userId: number,
  missionId: number
) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM user_mission WHERE user_id = ? AND mission_id = ?",
    [userId, missionId]
  );

  return rows.length > 0;
};

// 미션 도전 추가
export const createUserMission = async (
  userId: number,
  missionId: number
) => {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO user_mission (user_id, mission_id, status)
     VALUES (?, ?, 'CHALLENGING')`,
    [userId, missionId]
  );

  return result.insertId;
};