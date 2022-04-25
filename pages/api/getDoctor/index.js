import db from '../../../db/index'
export default async (req, res) =>
{
    if (req.method === 'GET')
    {
        let result = await db.query(`SELECT * FROM "public"."Staff" ORDER BY "staffID"`)
        res.json(result.rows)
    }
}