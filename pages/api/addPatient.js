import db from '../../db'

export default async (req, res)=>
{
    const { firstname, lastname, dob, gender, address, phone, citizenID,
            EC_name, EC_relationship, EC_phone, allergy, blood, med_history, insurance } = req.body

    if(req.method=="POST")
    {
        if(firstname && lastname && dob && gender && address && phone && citizenID &&
            EC_name && EC_relationship && EC_phone && blood)
        {
            let result = await db.query(`INSERT INTO "public"."Staff" ("firstname", "lastname", "birthDate", 
                            "gender", "address", "phone_number", "citizenID", "EC_name", 
                            "EC_Relationship", "EC_phone", "allergy", "bloodGroup", "med_history", "insurance") 
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
                    [firstname, lastname, dob, gender, address, phone, citizenID,
                    EC_name, EC_relationship, EC_phone, allergy, blood, med_history, insurance])
            
            res.json(result.rows[0])
        }
        else
            res.send('Register failed')
    }
}