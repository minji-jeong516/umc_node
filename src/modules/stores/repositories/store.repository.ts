import { pool } from "../../../db.config.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const findRegionById = async (regionId: number) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM region WHERE id = ?",
    [regionId]
  );

  return rows.length > 0;
};

export const createStore = async (
  regionId: number,
  name: string,
  address: string
) => {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO store (region_id, name, address)
     VALUES (?, ?, ?)`,
    [regionId, name, address]
  );

  return result.insertId;
};