import db from '../../../db'

export default async (req,res)=>{

    if(req.method === 'GET')
    {
        let patientID  = req.query.patientID
        let appointment =await db.query(`
            SELECT "Appointment".*,"Staff"."firstname" AS staff_Firstname,"Staff"."lastname" AS staff_Lastname
            ,"Staff"."profile_img" AS Staff_Profile_img FROM "public"."Appointment" 
            LEFT JOIN "public"."Staff" ON "Staff"."staffID" = "Appointment"."staffID"
            WHERE "patientID" = $1 AND "start_time" < CURRENT_DATE 
        `,[patientID])
        res.json(appointment.rows)
    }
}