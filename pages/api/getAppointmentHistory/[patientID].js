import db from '../../../db'

export default async (req,res)=>{

    if(req.method === 'GET')
    {
        let patientID  = req.query.patientID
        let appointment =await db.query(`
            SELECT "Appointment".* FROM "public"."Appointment" WHERE "patientID" = $1 
            AND "start_time" < CURRENT_DATE
        `,[patientID])

        res.json(appointment.rows)
    }
}