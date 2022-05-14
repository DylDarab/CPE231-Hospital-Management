import db from '../../../db'

export default async (req, res) =>
{
    let data = {
        "appointmentID": 3,
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

        const promise = device.map(async (d) =>
        {
            await db.query(`
                INSERT INTO "public"."DeviceWithdraw" ("deviceID","withdrawAmount","price_per_unit"
                ,"appointmentID","type","note") VALUES ($1,$2,$3,$4,$5,$6)
            `, [d.deviceID, d.amount, d.price, appointmentID, d.type, d.note])
        })
        await Promise.all(promise)

        const promise2 = medicine.map(async (m) =>
        {
            await db.query(`
                INSERT INTO "public"."MedicineWithdraw" ("medicineID","withdrawAmount","price_per_unit"
                ,"appointmentID","type","note") VALUES ($1,$2,$3,$4,$5,$6)
            `, [m.medicineID, m.amount, m.price, appointmentID, m.type, m.note])
        })
        await Promise.all(promise2)

        res.json({"status":"ok"})
    }
}