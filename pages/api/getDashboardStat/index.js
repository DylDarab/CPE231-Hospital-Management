import db from '../../../db'
import { format } from 'date-fns'

export default async (req, res) =>
{
    let today = new Date()
    //set today time to 00:00:00
    today.setHours(0, 0, 0, 0)
    console.log(today.toUTCString())
    let tomorrow = new Date()
    // set tomorrow time to 23:59:59
    tomorrow.setHours(23, 59, 59, 999)

    console.log(tomorrow)

    if (req.method === 'GET')
    {
        let totalAppointment = await db.query(`
        SELECT COUNT(*) OVER() AS totalAppointment FROM "public"."Appointment"`
        , [])
        
        let todayAppointment = await db.query(`
        SELECT COUNT("appointmentID") AS todayAppointment FROM "public"."Appointment" WHERE "start_time" BETWEEN $1 AND $2` 
        , [today,tomorrow])

        let totalDoctor = await db.query(`
        SELECT COUNT(*) OVER() AS totalDoctor FROM "public"."Staff" WHERE "positionID" = 100`
        )

        let totalPatient = await db.query(`
        SELECT COUNT(*) AS totalPatient FROM "public"."Patient"
        `)


        res.json({
            totalAppointment: totalAppointment.rows[0].totalappointment,
            todayAppointment: todayAppointment.rows[0].todayappointment,
            totalDoctor: totalDoctor.rows[0].totaldoctor,
            totalPatient: totalPatient.rows[0].totalpatient
        })
    }

}