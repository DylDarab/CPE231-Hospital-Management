import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event'
import db from '../../db'

export default async function handler (req, res)
{
    const { firstname, lastname, dob, gender, address, phone, citizenID,
            EC_name, EC_relationship, EC_phone, allergy, blood, med_history, insurance } = req.body

    if(req.method=="POST")
    {
        if(firstname && lastname && dob && gender && address && phone && citizenID &&
            EC_name && EC_relationship && EC_phone && blood)
        {
            let result = await db.query(`INSERT INTO "Patient" ("firstname", "lastname", "birthDate", 
                            "gender", "address", "phone_number", "citizenID", "EC_name", 
                            "EC_Relationship", "EC_phone", "allergy", "bloodGroup", "med_history", "insurance") 
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
                    [firstname, lastname, dob, gender, address, phone, citizenID,
                    EC_name, EC_relationship, EC_phone, allergy, blood, med_history, insurance])
            
            res.json(result.rows[0])
            // patient disease and log coming soon
        }
        else
            res.send('Register failed')
    }
}

// INSERT INTO "Patient" ("firstname", "lastname", "birthDate", "gender", "address", "phone_number",
// 	"citizenID", "EC_name", "EC_Relationship", "EC_phone", "allergy", "bloodGroup", "med_history", "insurance") VALUES
//     ('test2', 'tester2', '2022-04-20 03:08:44', 'male', 'testtest', '023456789', '12345678910',
//     'abc', 'married', '0222222', '-', 'AB', '-', '-');