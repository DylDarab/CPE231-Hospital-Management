import db from '../../../db/index'
import { decode } from 'js-base64'


export default async (req, res) =>
{
    // ยังไม่ได้เช็ค อย่าพึ่งใช้นะจ๊ะ
    let page = req.headers.page
    let search = decode(req.headers.search||'').toLowerCase()

    if (req.method === 'GET')
    {
        let result = await db.query(`SELECT "Appointment".*,CEILING(COUNT(*) OVER()/10) as page_amount FROM "public"."Appointment"
                    WHERE (LOWER(CONCAT("firstname",' ',"lastname")) LIKE '%${search}%')
                    ORDER BY "appointmentID" ASC LIMIT 10 OFFSET $1 `, [(page - 1) * 10])
        res.json(result.rows)
    }
}