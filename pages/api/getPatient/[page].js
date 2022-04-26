import db from '../../../db/index'
import {decode} from 'js-base64'


export default async (req, res) =>
{
    const { page } = req.query
    console.log('page',page)

    let search = decode(req.headers.search||'').toLowerCase()

    if (req.method === 'GET')
    {
        let result = await db.query(`SELECT "Patient".*,CEILING(COUNT(*) OVER()/10) as page_amount FROM "public"."Patient"
                    WHERE (LOWER(CONCAT("firstname",' ',"lastname")) LIKE '%${search}%')
                    ORDER BY "patientID" ASC LIMIT 8 OFFSET $1 `, [(page - 1) * 8])
        res.json(result.rows)
    }
}