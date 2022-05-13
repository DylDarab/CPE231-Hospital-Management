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

    let todayPrescription = await db.query(`
        SELECT COUNT(*) AS todayPrescription FROM "public"."MedicineWithdraw"
        LEFT JOIN "public"."Appointment" ON "MedicineWithdraw"."appointmentID" = "Appointment"."appointmentID"
        WHERE CAST(start_time AS DATE) = CAST(NOW() AS DATE)
    `);

    let totalPatient = await db.query(`
        SELECT COUNT(*) AS totalPatient FROM "public"."Patient"
        `);

    let patientsPerDoctor = await db.query(`
        SELECT AVG("Count") AS PatientsPerDoctor FROM (SELECT DISTINCT COUNT("patientID") AS "Count"
        FROM "public"."Appointment" LEFT JOIN "public"."Staff" ON "Staff"."staffID" = "Appointment"."staffID"
        WHERE "positionID" = 100 GROUP BY "Appointment"."staffID")
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
        SELECT "department_name", COUNT(DISTINCT "Appointment"."patientID") AS patientsPerDepartment
        FROM "public"."Appointment" LEFT JOIN "public"."Staff" ON "Appointment"."staffID" = "Staff"."staffID"
        LEFT JOIN "public"."Department" ON "Staff"."departmentID" = "Department"."departmentID"
        GROUP BY "department_name"
    `);

    res.json({
      // todayAppointment: todayAll.rows[0].todayappointment,
      todayAppointment: todayAppointment.rows[0].todayappointment,
      todayPrescription: todayPrescription.rows[0].todayprescription,
      totalPatient: totalPatient.rows[0].totalpatient,
      patientsPerDoctor: patientsPerDoctor.rows[0].patientsperdoctor,
      numberDiseaseEach: numberDiseaseEach.rows,
      patientInDepartment: patientInDepartment.rows,
    });
  }
};

// WHERE EXTRACT(MONTH FROM "start_time") >= EXTRACT(MONTH FROM CURRENT_TIMESTAMP) -6
