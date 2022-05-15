import db from '../../db'

export default async (req,res)=>{
    let appointmentID = req.body.appointmentid
    if(req.method === 'POST'){
        let result = await db.query(`
        UPDATE "public"."Appointment" SET "isCompleted" = true WHERE "appointmentID" = $1
        `,[appointmentID])
        res.json(result.rows)
    }
}