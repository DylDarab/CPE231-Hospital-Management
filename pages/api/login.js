import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event'
import db from '../../db'
export default async function handler (req, res)
{
   if(req.method=="POST")
   {
        let result = await db.query('SELECT * FROM "public"."Staff" WHERE username = $1'
                    ,[req.body.username])
       if (result.rows.length!=1)
        {
            res.send("Username not found")
        }
        else
        {
           if (result.rows[0].password==req.body.password)
            {
                res.json(result.rows[0])
            }
            else
            {
                res.send("Wrong Password")
            }
        }
   }
}