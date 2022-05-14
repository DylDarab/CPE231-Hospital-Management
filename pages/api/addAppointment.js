import db from '../../db/index'

export default async (req, res) =>
{

    let data = {
        "start_date": "2022-05-14T09:23:11.087Z", //isostring
        "patientID": "1",
        "staffID": "2",
        "symptoms": "ปวดหัว",
        "note": "กินข้าวน้อยเกินไป"
    }


    console.log(req.body)
    if (req.method === 'POST')
    {
        let start_date = new Date(req.body.start_date)
        let patientID = req.body.patientID
        let staffID = req.body.staffID
        let symptoms = req.body.symptoms
        let note = req.body.note

        let appointment = await db.query(`
            INSERT INTO "public"."Appointment" ("start_time","patientID","staffID","symptoms","note") VALUES ($1,$2,$3,$4,$5) RETURNING *
        `,[start_date, patientID, staffID, symptoms, note])

        res.json(appointment.rows[0])

    }
}