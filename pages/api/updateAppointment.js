import db from '../../db'
import addLog from '../../functions/addLog'

export default async (req, res) =>
{
    let data = {
        "appointmentID": 3,
        "summary": "sdfadfdfadsfas'dfks;dlfka;sdfdfsdfsadfasdfasdf",
        "medicine": [
            {
                "medicineID": 1,
                "price": 100,
                "amount": 100,
                "type": "takehome",//takehome,used
                "note": "กินข้าวน้อยเกินไป"
            },
            {
                "medicineID": 1,
                "price": 100,
                "amount": 100,
                "type": "takehome",//takehome,used
                "note": "กินข้าวน้อยเกินไป"
            },
        ],
        "device": [
            {
                "deviceID": 1,
                "price": 100,
                "amount": 100,
                "type": "takehome",//takehome,used
                "note": "กินข้าวน้อยเกินไป"
            },
            {
                "deviceID": 1,
                "price": 100,
                "amount": 100,
                "type": "takehome",//takehome,used
                "note": "กินข้าวน้อยเกินไป"
            },
        ]
    }

    if (req.method === 'POST')
    {
        let appointmentID = req.body.appointmentID
        let medicine = req.body.medicine
        let device = req.body.device
        let summary = req.body.summary

        let updateAppointment = await db.query(`
            UPDATE "public"."Appointment" SET "summary" = $1 WHERE "appointmentID" = $2
        `,[summary, appointmentID])

        const promise = device.map(async (d) =>
        {
            await db.query(`
                INSERT INTO "public"."DeviceWithdraw" ("deviceID","withdrawAmount","price_per_unit"
                ,"appointmentID","type","note") VALUES ($1,$2,$3,$4,$5,$6)
            `, [d.deviceID, d.amount, d.price, appointmentID, d.type, d.note])

            await db.query(`
                UPDATE "public"."Device" SET "d_amount" = "d_amount"-$1 WHERE "deviceID" = $2
            `,[d.amount, d.deviceID])
        })
        await Promise.all(promise)

        const promise2 = medicine.map(async (m) =>
        {
            await db.query(`
                INSERT INTO "public"."MedicineWithdraw" ("medicineID","withdrawAmount","price_per_unit"
                ,"appointmentID","type","note") VALUES ($1,$2,$3,$4,$5,$6)
            `, [m.medicineID, m.amount, m.price, appointmentID, m.type, m.note])

            await db.query(`
                UPDATE "public"."Medicine" SET "m_amount" = "m_amount"-$1 WHERE "medicineID" = $2
            `,[m.amount, m.medicineID])
        })
        await Promise.all(promise2)

        res.json({"status":"ok"})
    }
}