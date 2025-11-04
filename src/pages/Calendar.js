import React, { useState } from "react";
import "./Calendar.css";

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
  };

  return (
    <div className="calendar-container p-4">
      <h3 className="fw-bold text-primary mb-3">
        📅 Academic Calendar
      </h3>
      <p className="text-muted mb-4">
        View your upcoming classes, deadlines, and academic events.
      </p>

      <div className="card shadow-sm border-0 p-4">
        <div className="row g-4 align-items-center">
          {/* ===== Date Picker ===== */}
          <div className="col-md-5">
            <label className="form-label fw-semibold">Select Date</label>
            <input
              type="date"
              className="form-control border-primary"
              value={selectedDate.toISOString().split("T")[0]}
              onChange={handleDateChange}
            />
          </div>

          {/* ===== Event Details ===== */}
          <div className="col-md-7">
            <div
              className="event-card p-3 rounded"
              style={{ backgroundColor: "#f1f5ff" }}
            >
              <h6 className="fw-bold text-dark mb-2">
                Events for {selectedDate.toDateString()}
              </h6>
              <ul className="list-unstyled mb-0">
                <li>🎓 <strong>Class:</strong> Software Project Management</li>
                <li>🕓 <strong>Time:</strong> 2:00 PM – 4:00 PM</li>
                <li>📍 <strong>Venue:</strong> Virtual Meeting Room</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
