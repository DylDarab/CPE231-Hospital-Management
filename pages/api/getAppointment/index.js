import db from '../../../db/index'
import { decode } from 'js-base64'


export default async (req, res) =>
{
    // ยังไม่ได้เช็ค อย่าพึ่งใช้นะจ๊ะ
    let page = req.headers.page
    let search = decode(req.headers.search||'').toLowerCase()

    if (req.method === 'GET')
    {
        let result = await db.query(`SELECT "Appointment".*, "Patient".firstname AS fname_p, 
                    "Patient".lastname AS lname_p, "Staff".firstname AS fname_s, 
                    "Staff".lastname AS lname_s, CEILING(COUNT(*) OVER()/10) as page_amount FROM "Appointment"
                    LEFT JOIN "Patient" ON "Patient"."patientID" = "Appointment"."patientID"
                    LEFT JOIN "Staff" ON "Staff"."staffID" = "Appointment"."staffID"
                    WHERE "Appointment"."summary" IS NOT NULL AND (LOWER(CONCAT("Patient".firstname,' ',"Patient".lastname)) LIKE '%${search}%') AND
                    start_time BETWEEN CURRENT_DATE + INTERVAL '0 hour' AND CURRENT_DATE + INTERVAL '1 day' 
                    ORDER BY "appointmentID" ASC LIMIT 10 OFFSET $1 `, [(page - 1) * 10])
        res.json(result.rows)
    }
}