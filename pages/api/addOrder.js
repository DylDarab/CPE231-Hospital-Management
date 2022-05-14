import db from '../../db/index'

export default async (req, res) =>
{
    console.log('bro')
    console.log(req.body)
    if (req.method === 'POST')
    {
        let dateOrder = req.body.dateOrder
        let dateInStock = req.body.dateInStock
        let organizationID = req.body.organizationID
        let organizationName = req.body.organizationName

        if (organizationID == '0')
        {
            let organization = await db.query(`
                INSERT INTO "public"."Organization" ("organization_name") VALUES ($1)
                RETURNING *
            `, [organizationName])

            console.log(organization.rows[0].organizationID)
            let addOrder = await db.query(`
                INSERT INTO "public"."Order" ("dateOrder","organizationID","dateInStock") VALUES ($1,$2,$3) RETURNING *
            `, [dateOrder, organization.rows[0].organizationID, dateInStock])

            const promise = req.body.medicine.map(async (m) =>
            {
                await db.query(`
                    INSERT INTO "public"."OrderDetail" ("medicineID","amount","o_priceperunit","orderID") VALUES ($1,$2,$3,$4)
                `, [m.medicineID, m.amount, m.price, addOrder.rows[0].orderID])
            })
            await Promise.all(promise)

            const promise2 = req.body.device.map(async (d) =>
            {
                await db.query(`
                    INSERT INTO "public"."OrderDetail" ("deviceID","amount","o_priceperunit","orderID") VALUES ($1,$2,$3,$4)
                `, [d.deviceID, d.amount, d.price, addOrder.rows[0].orderID])
            })
            await Promise.all(promise2)

            res.json({ "status": "ok" })
        }
        else
        {
            console.log('right here')
            let addOrder = await db.query(`
                INSERT INTO "public"."Order" ("dateOrder","organizationID","dateInStock") VALUES ($1,$2,$3) RETURNING *
            `, [dateOrder, organizationID, dateInStock])

            const promise = req.body.medicine.map(async(m) =>
            {
                await db.query(`
                    INSERT INTO "public"."OrderDetail" ("medicineID","amount","o_priceperunit","orderID") VALUES ($1,$2,$3,$4)
                `, [m.medicineID, m.amount, m.price, addOrder.rows[0].orderID])
            })
            await Promise.all(promise)

            const promise2 = req.body.device.map(async(d) =>
            {
                await db.query(`
                    INSERT INTO "public"."OrderDetail" ("deviceID","amount","o_priceperunit","orderID") VALUES ($1,$2,$3,$4)
                `, [d.deviceID, d.amount, d.price, addOrder.rows[0].orderID])
            })
            await Promise.all(promise2)

            res.json({ "status": "ok" })
        }
    }
}