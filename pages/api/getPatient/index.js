import db from '../../../db/index'
export default async (req, res) =>
{
    if (req.method === 'GET')
    {
        let result = await db.query(`SELECT * FROM "public"."Patient" ORDER BY "patientID"`)
        res.json(result.rows)
    }
}