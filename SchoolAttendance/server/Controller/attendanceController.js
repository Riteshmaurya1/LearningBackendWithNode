const { fn, literal } = require("sequelize");
const { Records, Attendance } = require("../Model");

const searchByDate = async (req, res) => {
  try {
    const { date } = req.body; // use query as your route was GET
    if (!date) {
      return res.status(400).json({ message: "date required", success: false });
    }

    // Find records sheet for this date
    let rec = await Records.findOne({ where: { date } });
    if (!rec) {
      // no sheet yet
      return res.json({
        date,
        data: [],
        filled: false,
        recordsId: null,
        success: true,
      });
    }

    // Load marks for this sheet
    const marks = await Attendance.findAll({
      where: { records_id: rec.id },
      order: [["id", "ASC"]],
      attributes: ["id", "name", "status"],
    });

    const data = marks.map((m) => ({
      id: m.id,
      name: m.name,
      status: m.status,
    }));
    const filled = marks.length > 0;

    return res.json({ date, data, filled, recordsId: rec.id, success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

const markAttendance = async (req, res) => {
  try {
    const { date, records } = req.body;
    if (!date || !Array.isArray(records)) {
      return res
        .status(400)
        .json({ message: "date and records[] required", success: false });
    }

    let rec = await Records.findOne({ where: { date } });
    if (!rec) {
      rec = await Records.create({ date });
    }

    for (const r of records) {
      if (!r || !r.name) continue;
      const status =
        r.status === "present" || r.status === "absent" ? r.status : null;
      if (!status) continue;

      const [row] = await Attendance.findOrCreate({
        where: { records_id: rec.id, name: r.name },
        defaults: { records_id: rec.id, name: r.name, status },
      });
      if (row.status !== status) {
        await row.update({ status });
      }
    }

    // Read back the saved sheet
    const saved = await Attendance.findAll({
      where: { records_id: rec.id },
      order: [["id", "ASC"]],
      attributes: ["id", "name", "status"],
    });

    return res.json({
      message: "attendance saved",
      date,
      recordsId: rec.id,
      data: saved.map((m) => ({ id: m.id, name: m.name, status: m.status })),
      success: true,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

const getSummary = async (req, res) => {
  try {
    // total distinct days = number of records rows
    const totalDays = await Records.count();

    // One grouped query: per name present_count and absent_count
    const rows = await Attendance.findAll({
      attributes: [
        "name",
        [
          fn("SUM", literal("CASE WHEN status='present' THEN 1 ELSE 0 END")),
          "present",
        ],
      ],
      group: ["name"],
      order: [["name", "ASC"]],
      raw: true,
    });

    const students = rows.map((student) => {
      const present = Number(student.present) || 0;
      const percentage =
        totalDays === 0 ? 0 : Math.round((present / totalDays) * 100);
      return {
        name: student.name,
        present,
        totalDays,
        percentage,
      };
    });

    return res.status(200).json({
      students,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
module.exports = {
  searchByDate,
  markAttendance,
  getSummary,
};
