import React, { useState } from "react";

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
        fontFamily: "Arial",
      }}
    >
      <h1>Calendar Component</h1>

      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      {selectedDate && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#f4f4f4",
            borderRadius: "10px",
          }}
        >
          <h3>Selected Date:</h3>
          <p>{selectedDate}</p>
        </div>
      )}
    </div>
  );
};

export default Calendar;
