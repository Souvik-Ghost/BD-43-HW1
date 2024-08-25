let express = require("express");
let app = express();
let port = 3000;
let db;
let sqlite3 = require("sqlite3");
let { open } = require("sqlite");
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
// Connect to SQLite database
(async () => {
  db = await open({
    filename: "./BD-4.3-HW1/database.sqlite",
    driver: sqlite3.Database,
  });
  if (db) console.log("Connected to the SQLite database.");
})();
// Message
app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.3 HW1 Filter by parameter" });
});
// node BD-4.3-HW1/initDB.js
// THE ENPOINTS
// node BD-4.3-HW1
//1 /employees/gender/female
async function filterByGender(female) {
  let query = "SELECT * FROM employees WHERE gender = ?";
  let response = await db.all(query, [female]);
  return { employees: response };
}
app.get("/employees/gender/:gender", async (req, res) => {
  const gender = req.params.gender;
  try {
    let results = await filterByGender(gender);
    if (results.employees.length === 0) {
      return res.status(404).json({
        message: `No employees found with the specified ${gender} gender`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//2 /employees/department/Engineering
async function filterByDepartment(department) {
  let query = "SELECT * FROM employees WHERE department = ?";
  let response = await db.all(query, [department]);
  return { employees: response };
}
app.get("/employees/department/:department", async (req, res) => {
  const department = req.params.department;
  try {
    let results = await filterByDepartment(department);
    if (results.employees.length === 0) {
      return res.status(404).json({
        message: `No employees found with the specified ${department} department`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//3 /employees/job_title/Software%20Engineer
async function filterByJobTitle(job_title) {
  let query = "SELECT * FROM employees WHERE job_title = ?";
  let response = await db.all(query, [job_title]);
  return { employees: response };
}
app.get("/employees/job_title/:job_title", async (req, res) => {
  const job_title = req.params.job_title;
  try {
    let results = await filterByJobTitle(job_title);
    if (results.employees.length === 0) {
      return res.status(404).json({
        message: `No employees found with the specified ${job_title} job title.`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//4 /employees/location/New%20York
async function filterByLocation(location) {
  let query = "SELECT * FROM employees WHERE location = ?";
  let response = await db.all(query, [location]);
  return { employees: response };
}
app.get("/employees/location/:location", async (req, res) => {
  const location = req.params.location;
  try {
    let results = await filterByLocation(location);
    if (results.employees.length === 0) {
      return res.status(404).json({
        message: `No employees found with the specified ${location} location.`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
