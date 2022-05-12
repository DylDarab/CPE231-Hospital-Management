import db from '../../../db'

export default async (req,res)=>{
    
    let orderID = req.query.orderID

    if(req.method === 'GET')
    {
        let data = await db.query(`
        SELECT * FROM "public"."OrderDetail"
        LEFT JOIN "public"."Order" ON "Order"."orderID" = "OrderDetail"."OrderID"
        LEFT JOIN "public"."Organization" ON "Organization"."organizationID" = "Order"."organizationID"
        LEFT JOIN "public"."Medicine" ON "Medicine"."medicineID" = "OrderDetail"."medicineID"
        LEFT JOIN "public"."Device" ON "Device"."deviceID" = "OrderDetail"."deviceID" 
        WHERE "orderID" = $1`
        ,[orderID])
        res.json(data.rows[0])
    }
}