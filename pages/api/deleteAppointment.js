import db from '../../../db'

export default async (req,res)=>{

    if(req.query==='DELETE')
    {
        let appointmentID = req.headers.appointmentID
        let result = await db.query(`
            DELETE FROM "public"."Appointment" WHERE "appointmentID" = $1
        `,[appointmentID])
        res.json(result.rows)
    }
}