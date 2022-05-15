import db from '../../db'

export default async (req,res)=>{

    let body = {

    }

    if(req.method==='POST')
    {
        let device_name = req.body.device_name
        let description = req.body.description
        let d_priceperunit = req.body.d_priceperunit
        let isPermenant = req.body.isPermenant

        let result = await db.query(`
        INSERT INTO "public"."Device" ("device_name","description","d_priceperunit","isPermanent") 
        VALUES ($1,$2,$3,$4) RETURNING *`, [device_name, description, d_priceperunit,isPermenant])

        res.json(result.rows[0])
    }
}