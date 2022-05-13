import db from "../../../db";
import { format } from "date-fns";

export default async (req, res) => {
  let today = new Date();
  //set today time to 00:00:00
  today.setHours(0, 0, 0, 0);
  console.log(today.toUTCString());
  let tomorrow = new Date();
  // set tomorrow time to 23:59:59
  tomorrow.setHours(23, 59, 59, 999);

  if (req.method === "GET") {
    // let todayAll = await db.query(`
    // SELECT COUNT(*) AS todayAppointment FROM "public"."Appointment" WHERE "start_time" between $1 and $2`
    //     , [today, tomorrow])
    let todayAppointment = await db.query(`
        SELECT COUNT(*) AS todayAppointment FROM "public"."Appointment" WHERE CAST(start_time AS DATE) = CAST(NOW() AS DATE)
        `);

    let totalDoctor = await db.query(`
        SELECT COUNT(*) OVER() AS totalDoctor FROM "public"."Staff" WHERE "positionID" = 100`);

    let totalPatient = await db.query(`
        SELECT COUNT(*) AS totalPatient FROM "public"."Patient"
        `);

    let numberDiseaseEach = await db.query(`
        SELECT "diseaseName", COUNT("diseaseID") AS total
        FROM "public"."Appointment" LEFT JOIN "public"."Patient" ON "Appointment"."patientID" = "Patient"."patientID"
        LEFT JOIN "public"."PatientDisease" ON "Patient"."patientID" = "PatientDisease"."patientID"
        LEFT JOIN "public"."Disease" ON "PatientDisease"."diseaseID" = "Disease"."DiseaseID"
        WHERE CAST(start_time AS DATE) >= CAST(NOW() AS DATE) -30
        GROUP BY "diseaseID", "diseaseName"
        `);

    let patientInDepartment = await db.query(`
    SELECT "department_name", COUNT(DISTINCT "Patient"."patientID") AS patientPerDepartment
    FROM "public"."Appointment" LEFT JOIN "public"."Staff" ON "Appointment"."staffID" = "Staff"."staffID"
    LEFT JOIN "public"."Department" ON "Staff"."departmentID" = "Department"."departmentID"
    LEFT JOIN "public"."Patient" ON "Patient"."patientID" = "Appointment"."patientID"
    GROUP BY "department_name"
    `);

    res.json({
      // todayAppointment: todayAll.rows[0].todayappointment,
      todayAppointment: todayAppointment.rows[0].todayappointment,
      totalDoctor: totalDoctor.rows[0].totaldoctor,
      totalPatient: totalPatient.rows[0].totalpatient,
      numberDiseaseEach: numberDiseaseEach.rows,
      patientInDepartment: patientInDepartment.rows
    });
  }
};
