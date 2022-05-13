import db from '../../db'

export default async (req, res) =>
{
    if (req.method === 'GET')
    {
        let totalimportC = await db.query(`
        SELECT SUM("amount") OVER () AS "Sumamount" FROM "public"."OrderDetail"
        LEFT JOIN "public"."Order" ON "Order"."orderID" = "OrderDetail"."OrderID"
        WHERE CAST("dateInStock" AS DATE) >= CAST(NOW() AS DATE) - 30
        `)

        let totalimportL = await db.query(`
        SELECT SUM("amount") OVER () AS "Sumamount" FROM "public"."OrderDetail"
        LEFT JOIN "public"."Order" ON "Order"."orderID" = "OrderDetail"."OrderID"
        WHERE CAST("dateInStock" AS DATE) >= CAST(NOW() AS DATE) - 60
        `)
        
        let totalexportMC = await db.query(`
        SELECT SUM("MedicineWithdraw"."withdrawAmount") OVER () AS "MedSumamount"
		FROM "public"."Appointment"
        INNER JOIN "public"."MedicineWithdraw" ON "MedicineWithdraw"."appointmentID" = "Appointment"."appointmentID" 
        WHERE CAST("end_time" AS DATE) >= CAST(NOW() AS DATE) - 30
        `)

        let totalexportDC = await db.query(`
        SELECT SUM("DeviceWithdraw"."withdrawAmount") OVER () AS "DeSumamount"
		FROM "public"."Appointment"
        INNER JOIN "public"."DeviceWithdraw" ON "DeviceWithdraw"."appointmentID" = "Appointment"."appointmentID" 
        WHERE CAST("end_time" AS DATE) >= CAST(NOW() AS DATE) - 30
        `)

        let totalexportML = await db.query(`
        SELECT SUM("MedicineWithdraw"."withdrawAmount") OVER () AS "MedSumamount"
		FROM "public"."Appointment"
        INNER JOIN "public"."MedicineWithdraw" ON "MedicineWithdraw"."appointmentID" = "Appointment"."appointmentID" 
        WHERE CAST("end_time" AS DATE) >= CAST(NOW() AS DATE) - 60
        `)

        let totalexportDL = await db.query(`
        SELECT SUM("DeviceWithdraw"."withdrawAmount") OVER () AS "DeSumamount"
		FROM "public"."Appointment"
        INNER JOIN "public"."DeviceWithdraw" ON "DeviceWithdraw"."appointmentID" = "Appointment"."appointmentID" 
        WHERE CAST("end_time" AS DATE) >= CAST(NOW() AS DATE) - 60
        `)

        let toporgan = await db.query(`
        SELECT "organization_name", COUNT("Order"."organizationID")
            FROM "public"."Order"
            INNER JOIN "public"."Organization" ON "Organization"."organizationID" = "Order"."organizationID" 
            WHERE CAST("dateInStock" AS DATE) >= CAST(NOW() AS DATE) - 30 
            GROUP BY "organization_name"
            HAVING COUNT("Order"."organizationID") = (
                SELECT MAX("CNTOrgan")
                FROM (SELECT "organization_name", COUNT("organization_name") AS "CNTOrgan"
                    FROM "public"."Organization"
                    INNER JOIN "public"."Order" ON "Order"."organizationID" = "Organization"."organizationID" 
                    INNER JOIN "public"."OrderDetail" ON "OrderDetail"."OrderID" = "Order"."orderID"
                        WHERE CAST("dateInStock" AS DATE) >= CAST(NOW() AS DATE) - 30
                        GROUP BY "organization_name"))
        `)
        
        let topmedicine = await db.query(`
        SELECT "medicine_name", SUM("MedicineWithdraw"."withdrawAmount")
        FROM "public"."MedicineWithdraw"
        INNER JOIN "public"."Medicine" ON "Medicine"."medicineID" = "MedicineWithdraw"."medicineID" 
        INNER JOIN "public"."Appointment" ON "Appointment"."appointmentID" = "MedicineWithdraw"."appointmentID"
        WHERE CAST("end_time" AS DATE) >= CAST(NOW() AS DATE) - 30 
        GROUP BY "medicine_name"
        HAVING SUM("MedicineWithdraw"."withdrawAmount") = (
        SELECT MAX("SUMMed")
            FROM (SELECT "MedicineWithdraw"."medicineID", SUM("MedicineWithdraw"."withdrawAmount") AS "SUMMed"
                FROM "public"."MedicineWithdraw"
                INNER JOIN "public"."Medicine" ON "Medicine"."medicineID" = "MedicineWithdraw"."medicineID"
                INNER JOIN "public"."Appointment" ON "Appointment"."appointmentID" = "MedicineWithdraw"."appointmentID"
                    WHERE CAST("end_time" AS DATE) >= CAST(NOW() AS DATE) - 30 
                    GROUP BY "MedicineWithdraw"."medicineID")) 
        `)
        
        
        
        res.json(result.rows)
    }
}