import db from '../../../db/index'
export default async (req, res) =>
{
    const { page } = req.query
    console.log('page',page)
    if (req.method === 'GET')
    {
        let result = await db.query(`SELECT * FROM "public"."Patient" 
                    ORDER BY "patientID" ASC LIMIT 10 OFFSET $1 `, [(page - 1) * 10])
        res.json(result.rows)
    }
}