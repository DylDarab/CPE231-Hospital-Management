import db from '../../db'

export default async (req, res) =>
{
    const { firstname, lastname, dob, citizenID,license_number,phone_number,
    salary,username,password,email,profile_img,positionID,departmentID} = req.body

    if (req.method == "POST")
    {
        if (firstname && lastname && dob && gender && address && phone && citizenID &&
            EC_name && EC_relationship && EC_phone && blood)
        {
            let result = await db.query(`INSERT INTO "Patient" ("firstname", "lastname", "citizenID",
            "birthDate","license_number","phone_number","salary","username","password","email",
            "profile_img","positionID","departmentID") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`
                , [firstname, lastname, citizenID, dob, license_number, phone_number, salary,
                    username, password, email, profile_img, positionID, departmentID])
            res.json(result.rows[0])
        }
        else
            res.send('Register failed')
    }
}