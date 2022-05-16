import db from '../../db'
import addLog from '../../functions/addLog'
export default async (req, res) =>
{
    const { firstname, lastname, dob, citizenID,license_number,phone_number,
    salary,username,password,email,profile_img,positionID,departmentID} = req.body

    if (req.method == "POST")
    {
        if (firstname && lastname && dob && citizenID && license_number && phone_number && salary &&
            username && password && email && profile_img && positionID && departmentID)
        {
            let result = await db.query(`INSERT INTO "Staff" ("firstname", "lastname", "citizenID",
            "birthDate","license_number","phone_number","salary","username","password","email",
            "profile_img","positionID","departmentID") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`
                , [firstname, lastname, citizenID, dob, license_number, phone_number, salary,
                    username, password, email, profile_img, positionID, departmentID])
            res.json(result.rows[0])

            addLog(req.headers.staffid, `Add new staff ${firstname} ${lastname}`, new Date(), '')

        }
        else
            res.send('Register failed')
    }
}