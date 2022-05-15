import db from '../../db'

export default async (req,res)=>{
    if(req.method==='POST')
    {
        let medicine_name = req.body.medicine_name
        let description = req.body.description
        let m_priceperunit = req.body.m_priceperunit

        let result = await db.query(`
        INSERT INTO "public"."Medicine" ("medicine_name","description","m_priceperunit") 
        VALUES ($1,$2,$3) RETURNING *`,[medicine_name,description,m_priceperunit])

        res.json(result.rows[0])
    }
}