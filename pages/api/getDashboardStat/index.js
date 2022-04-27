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



    if (req.method === 'GET')
    {
        let todayAll = await db.query(`
        SELECT COUNT(*) OVER() AS todayAppointment FROM "public"."Appointment" WHERE "start_time" between $1 and $2`
            , [today, tomorrow])

        let totalDoctor = await db.query(`
        SELECT COUNT(*) OVER() AS totalDoctor FROM "public"."Staff" WHERE "positionID" = 100`
        )

        let totalPatient = await db.query(`
        SELECT COUNT(*) AS totalPatient FROM "public"."Patient"
        `)


        res.json({
            todayAppointment: todayAll.rows[0].todayappointment,
            totalDoctor: totalDoctor.rows[0].totaldoctor,
            totalPatient: totalPatient.rows[0].totalpatient
        })
    }

}