import db from '../../db'
export default async function handler (req, res)
{
   if(req.method=="POST")
   {
       let result = await db.query('SELECT * FROM "public".test')
       res.json(result.rows)
   }
}
