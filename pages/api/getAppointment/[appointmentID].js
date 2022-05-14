import db from '../../../db'

export default async (req, res) => {
    
        let appointmentID = req.query.appointmentID
        console.log(appointmentID)
        if (req.method === 'GET') {
            let data = await db.query(`
                SELECT "Appointment".*,"Patient"."firstname" AS patient_firstname,"Patient"."lastname" AS patient_lastname
                ,"Patient"."profile_img" AS patient_profile_img
                FROM "public"."Appointment" LEFT JOIN "public"."Patient" ON "Patient"."patientID" = "Appointment"."patientID"
                WHERE "appointmentID" = $1
            `, [appointmentID])
            res.json(data.rows)
        }
}