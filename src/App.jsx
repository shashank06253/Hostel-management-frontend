import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:8080/api";

function App() {
  // =========================================================
  // DASHBOARD
  // =========================================================

  const [summary, setSummary] = useState({
    totalStudents: 0,
    totalRooms: 0,
    totalAllocations: 0,
    totalFees: 0,
    totalComplaints: 0,
    totalAttendanceRecords: 0,
  });

  const [activePage, setActivePage] = useState("Dashboard");

  // =========================================================
  // STUDENTS
  // =========================================================

  const [students, setStudents] = useState([]);
  const [showStudentForm, setShowStudentForm] = useState(false);

  const [studentForm, setStudentForm] = useState({
    name: "",
    rollNo: "",
    email: "",
    phone: "",
    course: "",
    year: 2,
    roomNo: "",
  });

  // =========================================================
  // ROOMS
  // =========================================================

  const [rooms, setRooms] = useState([]);
  const [showRoomForm, setShowRoomForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  const [roomForm, setRoomForm] = useState({
    roomNumber: "",
    block: "",
    floor: 1,
    capacity: 4,
    occupied: 0,
    status: "AVAILABLE",
  });

  // =========================================================
  // ROOM ALLOCATIONS
  // =========================================================

  const [allocations, setAllocations] = useState([]);

  const [allocationForm, setAllocationForm] = useState({
    studentId: "",
    roomId: "",
  });

  const [showAllocationForm, setShowAllocationForm] = useState(false);

  const [complaints, setComplaints] = useState([]);
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [editingComplaint, setEditingComplaint] = useState(null);

  const [complaintForm, setComplaintForm] = useState({
    studentId: "",
    subject: "",
    description: "",
    createdDate: new Date().toISOString().split("T")[0],
    status: "OPEN",
  });

  const [attendance, setAttendance] = useState([]);
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);
  const [editingAttendance, setEditingAttendance] = useState(null);

  const [attendanceForm, setAttendanceForm] = useState({
    studentId: "",
    date: new Date().toISOString().split("T")[0],
    status: "PRESENT",
  });

  // =========================================================
  // FEES
  // =========================================================

  const [fees, setFees] = useState([]);
  const [showFeeForm, setShowFeeForm] = useState(false);
  const [editingFee, setEditingFee] = useState(null);

  const [feeForm, setFeeForm] = useState({
    studentId: "",
    amount: "",
    feeType: "HOSTEL",
    paymentDate: new Date().toISOString().split("T")[0],
    status: "PAID",
  });

  // =========================================================
  // DASHBOARD API
  // =========================================================

  const loadDashboard = () => {
    fetch(`${API}/dashboard/summary`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Dashboard request failed");
        }

        return response.json();
      })
      .then((data) => {
        setSummary(data);
      })
      .catch((error) => {
        console.error("Dashboard error:", error);
      });
  };

  // =========================================================
  // STUDENT API
  // =========================================================

  const loadStudents = () => {
    fetch(`${API}/students`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Students request failed");
        }

        return response.json();
      })
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.error("Students error:", error);
      });
  };

  const addStudent = (e) => {
    e.preventDefault();

    fetch(`${API}/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentForm),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add student");
        }

        return response.json();
      })
      .then(() => {
        alert("Student added successfully!");

        setShowStudentForm(false);

        setStudentForm({
          name: "",
          rollNo: "",
          email: "",
          phone: "",
          course: "",
          year: 2,
          roomNo: "",
        });

        loadStudents();
        loadDashboard();
      })
      .catch((error) => {
        console.error("Add student error:", error);
        alert("Failed to add student");
      });
  };

  // =========================================================
  // ROOM API
  // =========================================================

  const loadRooms = () => {
    fetch(`${API}/rooms`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Rooms request failed");
        }

        return response.json();
      })
      .then((data) => {
        setRooms(data);
      })
      .catch((error) => {
        console.error("Rooms error:", error);
      });
  };

  const addRoom = (e) => {
    e.preventDefault();

    fetch(`${API}/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomForm),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add room");
        }

        return response.json();
      })
      .then(() => {
        alert("Room added successfully!");

        setShowRoomForm(false);

        setRoomForm({
          roomNumber: "",
          block: "",
          floor: 1,
          capacity: 4,
          occupied: 0,
          status: "AVAILABLE",
        });

        loadRooms();
        loadDashboard();
      })
      .catch((error) => {
        console.error("Add room error:", error);
        alert("Failed to add room");
      });
  };

  const updateRoom = (e) => {
    e.preventDefault();

    fetch(`${API}/rooms/${editingRoom.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomForm),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update room");
        }

        return response.json();
      })
      .then(() => {
        alert("Room updated successfully!");

        setEditingRoom(null);
        setShowRoomForm(false);

        setRoomForm({
          roomNumber: "",
          block: "",
          floor: 1,
          capacity: 4,
          occupied: 0,
          status: "AVAILABLE",
        });

        loadRooms();
        loadDashboard();
      })
      .catch((error) => {
        console.error("Update room error:", error);
        alert("Failed to update room");
      });
  };

  const deleteRoom = (id) => {
    if (!window.confirm("Are you sure you want to delete this room?")) {
      return;
    }

    fetch(`${API}/rooms/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete room");
        }
      })
      .then(() => {
        alert("Room deleted successfully!");

        loadRooms();
        loadDashboard();
      })
      .catch((error) => {
        console.error("Delete room error:", error);
        alert("Failed to delete room");
      });
  };

  const startEditRoom = (room) => {
    setEditingRoom(room);

    setRoomForm({
      roomNumber: room.roomNumber,
      block: room.block,
      floor: room.floor,
      capacity: room.capacity,
      occupied: room.occupied,
      status: room.status,
    });

    setShowRoomForm(true);
  };

  // =========================================================
  // ALLOCATION API
  // =========================================================

  const loadAllocations = () => {
    fetch(`${API}/allocations`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Allocations request failed");
        }

        return response.json();
      })
      .then((data) => {
        setAllocations(data);
      })
      .catch((error) => {
        console.error("Allocations error:", error);
      });
  };

  const allocateRoom = async () => {
    if (!allocationForm.studentId || !allocationForm.roomId) {
      alert("Please select student and room");
      return;
    }

    try {
      const response = await fetch(`${API}/allocations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: Number(allocationForm.studentId),
          roomId: Number(allocationForm.roomId),
        }),
      });

      if (!response.ok) {
        throw new Error("Allocation failed");
      }

      alert("Room allocated successfully!");

      setAllocationForm({
        studentId: "",
        roomId: "",
      });

      setShowAllocationForm(false);

      loadAllocations();
      loadRooms();
      loadStudents();
      loadDashboard();
    } catch (error) {
      console.error("Allocation error:", error);
      alert("Failed to allocate room");
    }
  };

  const deleteAllocation = async (id) => {
    if (!window.confirm("Delete this allocation?")) {
      return;
    }

    try {
      const response = await fetch(`${API}/allocations/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete allocation");
      }

      alert("Allocation deleted successfully!");

      loadAllocations();
      loadRooms();
      loadStudents();
      loadDashboard();
    } catch (error) {
      console.error("Delete allocation error:", error);
      alert("Failed to delete allocation");
    }
  };

  // ---------------- COMPLAINTS ----------------

  const loadComplaints = () => {
    fetch(`${API}/complaints`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Complaints request failed");
        }

        return response.json();
      })
      .then((data) => setComplaints(data))
      .catch((error) => console.error("Complaints error:", error));
  };

  const addComplaint = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/complaints`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: Number(complaintForm.studentId),
          subject: complaintForm.subject,
          description: complaintForm.description,
          createdDate: complaintForm.createdDate,
          status: complaintForm.status,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add complaint");
      }

      setShowComplaintForm(false);
      setComplaintForm({
        studentId: "",
        subject: "",
        description: "",
        createdDate: new Date().toISOString().split("T")[0],
        status: "OPEN",
      });

      loadComplaints();
      loadDashboard();
    } catch (error) {
      console.error("Add complaint error:", error);
      alert("Failed to add complaint");
    }
  };

  const updateComplaint = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API}/complaints/${editingComplaint.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId: Number(complaintForm.studentId),
            subject: complaintForm.subject,
            description: complaintForm.description,
            createdDate: complaintForm.createdDate,
            status: complaintForm.status,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update complaint");
      }

      setEditingComplaint(null);
      setShowComplaintForm(false);
      loadComplaints();
      loadDashboard();
    } catch (error) {
      console.error("Update complaint error:", error);
      alert("Failed to update complaint");
    }
  };

  const startEditComplaint = (complaint) => {
    setEditingComplaint(complaint);
    setComplaintForm({
      studentId: complaint.studentId,
      subject: complaint.subject,
      description: complaint.description,
      createdDate: complaint.createdDate,
      status: complaint.status,
    });
    setShowComplaintForm(true);
  };

  const deleteComplaint = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) {
      return;
    }

    try {
      const response = await fetch(`${API}/complaints/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete complaint");
      }

      loadComplaints();
      loadDashboard();
    } catch (error) {
      console.error("Delete complaint error:", error);
      alert("Failed to delete complaint");
    }
  };

  // ---------------- ATTENDANCE ----------------

  const loadAttendance = () => {
    fetch(`${API}/attendance`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Attendance request failed");
        }

        return response.json();
      })
      .then((data) => setAttendance(data))
      .catch((error) => console.error("Attendance error:", error));
  };

  const addAttendance = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: Number(attendanceForm.studentId),
          date: attendanceForm.date,
          status: attendanceForm.status,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add attendance");
      }

      setShowAttendanceForm(false);
      setAttendanceForm({
        studentId: "",
        date: new Date().toISOString().split("T")[0],
        status: "PRESENT",
      });
      loadAttendance();
      loadDashboard();
    } catch (error) {
      console.error("Add attendance error:", error);
      alert("Failed to add attendance");
    }
  };

  const updateAttendance = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API}/attendance/${editingAttendance.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId: Number(attendanceForm.studentId),
            date: attendanceForm.date,
            status: attendanceForm.status,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update attendance");
      }

      setEditingAttendance(null);
      setShowAttendanceForm(false);
      loadAttendance();
      loadDashboard();
    } catch (error) {
      console.error("Update attendance error:", error);
      alert("Failed to update attendance");
    }
  };

  const startEditAttendance = (record) => {
    setEditingAttendance(record);
    setAttendanceForm({
      studentId: record.studentId,
      date: record.date,
      status: record.status,
    });
    setShowAttendanceForm(true);
  };

  const deleteAttendance = async (id) => {
    if (!window.confirm("Are you sure you want to delete this attendance record?")) {
      return;
    }

    try {
      const response = await fetch(`${API}/attendance/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete attendance");
      }

      loadAttendance();
      loadDashboard();
    } catch (error) {
      console.error("Delete attendance error:", error);
      alert("Failed to delete attendance");
    }
  };

  // =========================================================
  // FEES API
  // =========================================================

  const loadFees = () => {
    fetch(`${API}/fees`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Fees request failed");
        }

        return response.json();
      })
      .then((data) => {
        setFees(data);
      })
      .catch((error) => {
        console.error("Fees error:", error);
      });
  };

  const resetFeeForm = () => {
    setFeeForm({
      studentId: "",
      amount: "",
      feeType: "HOSTEL",
      paymentDate: new Date().toISOString().split("T")[0],
      status: "PAID",
    });
  };

  const addFee = (e) => {
    e.preventDefault();

    if (!feeForm.studentId || !feeForm.amount || !feeForm.paymentDate) {
      alert("Please fill all required fee details");
      return;
    }

    fetch(`${API}/fees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId: Number(feeForm.studentId),
        amount: Number(feeForm.amount),
        feeType: feeForm.feeType,
        paymentDate: feeForm.paymentDate,
        status: feeForm.status,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add fee");
        }

        return response.json();
      })
      .then(() => {
        alert("Fee added successfully!");

        setShowFeeForm(false);
        setEditingFee(null);
        resetFeeForm();

        loadFees();
        loadDashboard();
      })
      .catch((error) => {
        console.error("Add fee error:", error);
        alert("Failed to add fee");
      });
  };

  const updateFee = (e) => {
    e.preventDefault();

    if (!editingFee) {
      return;
    }

    if (!feeForm.studentId || !feeForm.amount || !feeForm.paymentDate) {
      alert("Please fill all required fee details");
      return;
    }

    fetch(`${API}/fees/${editingFee.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId: Number(feeForm.studentId),
        amount: Number(feeForm.amount),
        feeType: feeForm.feeType,
        paymentDate: feeForm.paymentDate,
        status: feeForm.status,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update fee");
        }

        return response.json();
      })
      .then(() => {
        alert("Fee updated successfully!");

        setShowFeeForm(false);
        setEditingFee(null);
        resetFeeForm();

        loadFees();
        loadDashboard();
      })
      .catch((error) => {
        console.error("Update fee error:", error);
        alert("Failed to update fee");
      });
  };

  const startEditFee = (fee) => {
    setEditingFee(fee);

    setFeeForm({
      studentId: fee.studentId ?? "",
      amount: fee.amount ?? "",
      feeType: fee.feeType ?? "HOSTEL",
      paymentDate: fee.paymentDate ?? new Date().toISOString().split("T")[0],
      status: fee.status ?? "PAID",
    });

    setShowFeeForm(true);
  };

  const deleteFee = (id) => {
    if (!window.confirm("Are you sure you want to delete this fee record?")) {
      return;
    }

    fetch(`${API}/fees/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete fee");
        }
      })
      .then(() => {
        alert("Fee deleted successfully!");

        loadFees();
        loadDashboard();
      })
      .catch((error) => {
        console.error("Delete fee error:", error);
        alert("Failed to delete fee");
      });
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    loadDashboard();
    loadStudents();
    loadRooms();
    loadAllocations();
    loadFees();
    loadComplaints();
    loadAttendance();
  }, []);

  // =========================================================
  // MENU
  // =========================================================

  const menuItems = [
    "Dashboard",
    "Students",
    "Rooms",
    "Room Allocations",
    "Fees",
    "Complaints",
    "Attendance",
  ];

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="app">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="sidebar">

        <div className="logo">

          <div className="logo-icon">
            H
          </div>

          <div>
            <h2>HostelMS</h2>
            <span>Management System</span>
          </div>

        </div>

        <nav>

          {menuItems.map((item) => (

            <button
              key={item}
              className={
                activePage === item
                  ? "menu active"
                  : "menu"
              }
              onClick={() => setActivePage(item)}
            >

              <span>
                {item === "Dashboard" && "▦"}
                {item === "Students" && "👨‍🎓"}
                {item === "Rooms" && "🏠"}
                {item === "Room Allocations" && "🛏️"}
                {item === "Fees" && "💳"}
                {item === "Complaints" && "📝"}
                {item === "Attendance" && "✓"}
              </span>

              {item}

            </button>

          ))}

        </nav>

        <div className="sidebar-bottom">

          <p>Hostel Management</p>

          <small>
            Spring Boot + React
          </small>

        </div>

      </aside>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="main">

        {/* ===================================================
            TOPBAR
        =================================================== */}

        <header className="topbar">

          <div>

            <h1>
              {activePage}
            </h1>

            <p>
              Hostel Management System
            </p>

          </div>

          <div className="admin">

            <div className="avatar">
              A
            </div>

            <div>

              <strong>
                Administrator
              </strong>

              <small>
                Hostel Admin
              </small>

            </div>

          </div>

        </header>

        {/* ===================================================
            DASHBOARD
        =================================================== */}

        {activePage === "Dashboard" && (

          <section>

            <div className="welcome">

              <div>

                <h2>
                  Welcome back 👋
                </h2>

                <p>
                  Manage students, rooms,
                  allocations, fees and hostel
                  activities from one place.
                </p>

              </div>

              <button
                className="refresh"
                onClick={() => {
                  loadDashboard();
                  loadStudents();
                  loadRooms();
                  loadAllocations();
                  loadFees();
                }}
              >
                ↻ Refresh
              </button>

            </div>

            {/* DASHBOARD CARDS */}

            <div className="cards">

              <div className="card">

                <div className="card-icon blue">
                  👨‍🎓
                </div>

                <div>

                  <span>
                    Total Students
                  </span>

                  <h2>
                    {summary.totalStudents}
                  </h2>

                </div>

              </div>

              <div className="card">

                <div className="card-icon green">
                  🏠
                </div>

                <div>

                  <span>
                    Total Rooms
                  </span>

                  <h2>
                    {summary.totalRooms}
                  </h2>

                </div>

              </div>

              <div className="card">

                <div className="card-icon purple">
                  🛏️
                </div>

                <div>

                  <span>
                    Allocations
                  </span>

                  <h2>
                    {summary.totalAllocations}
                  </h2>

                </div>

              </div>

              <div className="card">

                <div className="card-icon orange">
                  💳
                </div>

                <div>

                  <span>
                    Total Fees
                  </span>

                  <h2>
                    {summary.totalFees}
                  </h2>

                </div>

              </div>

              <div className="card">

                <div className="card-icon red">
                  📝
                </div>

                <div>

                  <span>
                    Complaints
                  </span>

                  <h2>
                    {summary.totalComplaints}
                  </h2>

                </div>

              </div>

              <div className="card">

                <div className="card-icon teal">
                  ✓
                </div>

                <div>

                  <span>
                    Attendance Records
                  </span>

                  <h2>
                    {summary.totalAttendanceRecords}
                  </h2>

                </div>

              </div>

            </div>

            {/* QUICK ACCESS */}

            <div className="quick-section">

              <h2>
                Quick Access
              </h2>

              <div className="quick-grid">

                <button
                  onClick={() =>
                    setActivePage("Students")
                  }
                >

                  <span>
                    👨‍🎓
                  </span>

                  <strong>
                    Manage Students
                  </strong>

                  <small>
                    Add, update and view students
                  </small>

                </button>

                <button
                  onClick={() =>
                    setActivePage("Rooms")
                  }
                >

                  <span>
                    🏠
                  </span>

                  <strong>
                    Manage Rooms
                  </strong>

                  <small>
                    View hostel rooms and occupancy
                  </small>

                </button>

                <button
                  onClick={() =>
                    setActivePage("Room Allocations")
                  }
                >

                  <span>
                    🛏️
                  </span>

                  <strong>
                    Room Allocation
                  </strong>

                  <small>
                    Allocate rooms to students
                  </small>

                </button>

                <button
                  onClick={() =>
                    setActivePage("Fees")
                  }
                >

                  <span>
                    💳
                  </span>

                  <strong>
                    Fee Management
                  </strong>

                  <small>
                    Track student payments
                  </small>

                </button>

              </div>

            </div>

          </section>

        )}

        {/* ===================================================
            STUDENTS
        =================================================== */}

        {activePage === "Students" && (

          <section className="module">

            <div className="module-header">

              <div>

                <h2>
                  Student Management
                </h2>

                <p>
                  Add, update and manage hostel students.
                </p>

              </div>

              <button
                className="primary-btn"
                onClick={() =>
                  setShowStudentForm(true)
                }
              >
                + Add Student
              </button>

            </div>

            {/* STUDENT FORM */}

            {showStudentForm && (

              <form
                className="form-card"
                onSubmit={addStudent}
              >

                <h3>
                  Add Student
                </h3>

                <input
                  placeholder="Name"
                  value={studentForm.name}
                  onChange={(e) =>
                    setStudentForm({
                      ...studentForm,
                      name: e.target.value,
                    })
                  }
                  required
                />

                <input
                  placeholder="Roll Number"
                  value={studentForm.rollNo}
                  onChange={(e) =>
                    setStudentForm({
                      ...studentForm,
                      rollNo: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={studentForm.email}
                  onChange={(e) =>
                    setStudentForm({
                      ...studentForm,
                      email: e.target.value,
                    })
                  }
                  required
                />

                <input
                  placeholder="Phone"
                  value={studentForm.phone}
                  onChange={(e) =>
                    setStudentForm({
                      ...studentForm,
                      phone: e.target.value,
                    })
                  }
                  required
                />

                <input
                  placeholder="Course"
                  value={studentForm.course}
                  onChange={(e) =>
                    setStudentForm({
                      ...studentForm,
                      course: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="number"
                  placeholder="Year"
                  value={studentForm.year}
                  onChange={(e) =>
                    setStudentForm({
                      ...studentForm,
                      year: Number(e.target.value),
                    })
                  }
                  required
                />

                <input
                  placeholder="Room Number"
                  value={studentForm.roomNo}
                  onChange={(e) =>
                    setStudentForm({
                      ...studentForm,
                      roomNo: e.target.value,
                    })
                  }
                />

                <div className="form-buttons">

                  <button
                    type="submit"
                    className="primary-btn"
                  >
                    Save Student
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setShowStudentForm(false)
                    }
                  >
                    Cancel
                  </button>

                </div>

              </form>

            )}

            {/* STUDENT TABLE */}

            <div className="table-card">

              <div className="table-title">

                <h2>
                  Students ({students.length})
                </h2>

                <button
                  onClick={loadStudents}
                >
                  ↻ Refresh
                </button>

              </div>

              <div className="table-container">

                <table>

                  <thead>

                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Roll No</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Course</th>
                      <th>Year</th>
                      <th>Room</th>
                    </tr>

                  </thead>

                  <tbody>

                    {students.map((student) => (

                      <tr key={student.id}>

                        <td>
                          {student.id}
                        </td>

                        <td>
                          {student.name}
                        </td>

                        <td>
                          {student.rollNo}
                        </td>

                        <td>
                          {student.email}
                        </td>

                        <td>
                          {student.phone}
                        </td>

                        <td>
                          {student.course}
                        </td>

                        <td>
                          {student.year}
                        </td>

                        <td>
                          {student.roomNo || "UNASSIGNED"}
                        </td>

                      </tr>

                    ))}

                    {students.length === 0 && (

                      <tr>

                        <td colSpan="8">
                          No students found.
                        </td>

                      </tr>

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </section>

        )}

        {/* ===================================================
            ROOMS
        =================================================== */}

        {activePage === "Rooms" && (

          <section className="module">

            <div className="module-header">

              <div>

                <h2>
                  Room Management
                </h2>

                <p>
                  Manage hostel rooms and occupancy.
                </p>

              </div>

              <button
                className="primary-btn"
                onClick={() => {

                  setEditingRoom(null);

                  setRoomForm({
                    roomNumber: "",
                    block: "",
                    floor: 1,
                    capacity: 4,
                    occupied: 0,
                    status: "AVAILABLE",
                  });

                  setShowRoomForm(true);

                }}
              >
                + Add Room
              </button>

            </div>

            {/* ROOM FORM */}

            {showRoomForm && (

              <form
                className="form-card"
                onSubmit={
                  editingRoom
                    ? updateRoom
                    : addRoom
                }
              >

                <h3>
                  {editingRoom
                    ? "Update Room"
                    : "Add Room"}
                </h3>

                <input
                  placeholder="Room Number"
                  value={roomForm.roomNumber}
                  onChange={(e) =>
                    setRoomForm({
                      ...roomForm,
                      roomNumber: e.target.value,
                    })
                  }
                  required
                />

                <input
                  placeholder="Block"
                  value={roomForm.block}
                  onChange={(e) =>
                    setRoomForm({
                      ...roomForm,
                      block: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="number"
                  placeholder="Floor"
                  value={roomForm.floor}
                  onChange={(e) =>
                    setRoomForm({
                      ...roomForm,
                      floor: Number(e.target.value),
                    })
                  }
                  required
                />

                <input
                  type="number"
                  placeholder="Capacity"
                  value={roomForm.capacity}
                  onChange={(e) =>
                    setRoomForm({
                      ...roomForm,
                      capacity: Number(e.target.value),
                    })
                  }
                  required
                />

                <input
                  type="number"
                  placeholder="Occupied"
                  value={roomForm.occupied}
                  onChange={(e) =>
                    setRoomForm({
                      ...roomForm,
                      occupied: Number(e.target.value),
                    })
                  }
                  required
                />

                <select
                  value={roomForm.status}
                  onChange={(e) =>
                    setRoomForm({
                      ...roomForm,
                      status: e.target.value,
                    })
                  }
                >

                  <option value="AVAILABLE">
                    AVAILABLE
                  </option>

                  <option value="FULL">
                    FULL
                  </option>

                  <option value="MAINTENANCE">
                    MAINTENANCE
                  </option>

                </select>

                <div className="form-buttons">

                  <button
                    type="submit"
                    className="primary-btn"
                  >
                    {editingRoom
                      ? "Update Room"
                      : "Save Room"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowRoomForm(false);
                      setEditingRoom(null);
                    }}
                  >
                    Cancel
                  </button>

                </div>

              </form>

            )}

            {/* ROOM TABLE */}

            <div className="table-card">

              <div className="table-title">

                <h2>
                  Rooms ({rooms.length})
                </h2>

                <button
                  onClick={loadRooms}
                >
                  ↻ Refresh
                </button>

              </div>

              <div className="table-container">

                <table>

                  <thead>

                    <tr>
                      <th>ID</th>
                      <th>Room Number</th>
                      <th>Block</th>
                      <th>Floor</th>
                      <th>Capacity</th>
                      <th>Occupied</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>

                  </thead>

                  <tbody>

                    {rooms.map((room) => (

                      <tr key={room.id}>

                        <td>
                          {room.id}
                        </td>

                        <td>
                          {room.roomNumber}
                        </td>

                        <td>
                          {room.block}
                        </td>

                        <td>
                          {room.floor}
                        </td>

                        <td>
                          {room.capacity}
                        </td>

                        <td>
                          {room.occupied}
                        </td>

                        <td>
                          <span className="status">
                            {room.status}
                          </span>
                        </td>

                        <td>

                          <button
                            className="edit-btn"
                            onClick={() =>
                              startEditRoom(room)
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              deleteRoom(room.id)
                            }
                          >
                            Delete
                          </button>

                        </td>

                      </tr>

                    ))}

                    {rooms.length === 0 && (

                      <tr>

                        <td colSpan="8">
                          No rooms found.
                        </td>

                      </tr>

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </section>

        )}

        {/* ===================================================
            ROOM ALLOCATIONS
        =================================================== */}

        {activePage === "Room Allocations" && (

          <section className="module">

            <div className="module-header">

              <div>

                <h2>
                  Room Allocation
                </h2>

                <p>
                  Allocate hostel rooms to students.
                </p>

              </div>

              <button
                className="primary-btn"
                onClick={() =>
                  setShowAllocationForm(true)
                }
              >
                + Allocate Room
              </button>

            </div>

            {/* ALLOCATION FORM */}

            {showAllocationForm && (

              <div className="form-card">

                <h3>
                  Allocate Room
                </h3>

                <select
                  value={allocationForm.studentId}
                  onChange={(e) =>
                    setAllocationForm({
                      ...allocationForm,
                      studentId: e.target.value,
                    })
                  }
                >

                  <option value="">
                    Select Student
                  </option>

                  {students.map((student) => (

                    <option
                      key={student.id}
                      value={student.id}
                    >
                      {student.name} - {student.rollNo}
                    </option>

                  ))}

                </select>

                <select
                  value={allocationForm.roomId}
                  onChange={(e) =>
                    setAllocationForm({
                      ...allocationForm,
                      roomId: e.target.value,
                    })
                  }
                >

                  <option value="">
                    Select Room
                  </option>

                  {rooms
                    .filter(
                      (room) =>
                        room.occupied < room.capacity &&
                        room.status !== "MAINTENANCE"
                    )
                    .map((room) => (

                      <option
                        key={room.id}
                        value={room.id}
                      >
                        {room.roomNumber} - Block {room.block}
                        {" "}({room.occupied}/{room.capacity})
                      </option>

                    ))}

                </select>

                <div className="form-buttons">

                  <button
                    type="button"
                    className="primary-btn"
                    onClick={allocateRoom}
                  >
                    Allocate
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowAllocationForm(false);

                      setAllocationForm({
                        studentId: "",
                        roomId: "",
                      });
                    }}
                  >
                    Cancel
                  </button>

                </div>

              </div>

            )}

            {/* ALLOCATION TABLE */}

            <div className="table-card">

              <div className="table-title">

                <h2>
                  Current Allocations ({allocations.length})
                </h2>

                <button
                  onClick={loadAllocations}
                >
                  ↻ Refresh
                </button>

              </div>

              <div className="table-container">

                <table>

                  <thead>

                    <tr>
                      <th>ID</th>
                      <th>Student ID</th>
                      <th>Room ID</th>
                      <th>Action</th>
                    </tr>

                  </thead>

                  <tbody>

                    {allocations.map((allocation) => (

                      <tr key={allocation.id}>

                        <td>
                          {allocation.id}
                        </td>

                        <td>
                          {allocation.studentId}
                        </td>

                        <td>
                          {allocation.roomId}
                        </td>

                        <td>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              deleteAllocation(
                                allocation.id
                              )
                            }
                          >
                            Delete
                          </button>

                        </td>

                      </tr>

                    ))}

                    {allocations.length === 0 && (

                      <tr>

                        <td colSpan="4">
                          No room allocations found.
                        </td>

                      </tr>

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </section>

        )}

        {/* ===================================================
            FEES
        =================================================== */}

        {activePage === "Fees" && (

          <section className="module">

            <div className="module-header">

              <div>

                <h2>
                  Fee Management
                </h2>

                <p>
                  Track student hostel fee payments.
                </p>

              </div>

              <button
                className="primary-btn"
                onClick={() => {
                  setEditingFee(null);
                  resetFeeForm();
                  setShowFeeForm(true);
                }}
              >
                + Add Fee
              </button>

            </div>

            {showFeeForm && (

              <form
                className="form-card"
                onSubmit={
                  editingFee
                    ? updateFee
                    : addFee
                }
              >

                <h3>
                  {editingFee
                    ? "Update Fee"
                    : "Add Fee"}
                </h3>

                <select
                  value={feeForm.studentId}
                  onChange={(e) =>
                    setFeeForm({
                      ...feeForm,
                      studentId: e.target.value,
                    })
                  }
                  required
                >

                  <option value="">
                    Select Student
                  </option>

                  {students.map((student) => (

                    <option
                      key={student.id}
                      value={student.id}
                    >
                      {student.name} - {student.rollNo}
                    </option>

                  ))}

                </select>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Amount"
                  value={feeForm.amount}
                  onChange={(e) =>
                    setFeeForm({
                      ...feeForm,
                      amount: e.target.value,
                    })
                  }
                  required
                />

                <select
                  value={feeForm.feeType}
                  onChange={(e) =>
                    setFeeForm({
                      ...feeForm,
                      feeType: e.target.value,
                    })
                  }
                  required
                >
                  <option value="HOSTEL">
                    HOSTEL
                  </option>

                  <option value="MESS">
                    MESS
                  </option>

                  <option value="OTHER">
                    OTHER
                  </option>
                </select>

                <input
                  type="date"
                  value={feeForm.paymentDate}
                  onChange={(e) =>
                    setFeeForm({
                      ...feeForm,
                      paymentDate: e.target.value,
                    })
                  }
                  required
                />

                <select
                  value={feeForm.status}
                  onChange={(e) =>
                    setFeeForm({
                      ...feeForm,
                      status: e.target.value,
                    })
                  }
                  required
                >
                  <option value="PAID">
                    PAID
                  </option>

                  <option value="PENDING">
                    PENDING
                  </option>

                  <option value="PARTIAL">
                    PARTIAL
                  </option>
                </select>

                <div className="form-buttons">

                  <button
                    type="submit"
                    className="primary-btn"
                  >
                    {editingFee
                      ? "Update Fee"
                      : "Save Fee"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowFeeForm(false);
                      setEditingFee(null);
                      resetFeeForm();
                    }}
                  >
                    Cancel
                  </button>

                </div>

              </form>

            )}

            <div className="table-card">

              <div className="table-title">

                <h2>
                  Fee Records ({fees.length})
                </h2>

                <button
                  onClick={loadFees}
                >
                  ↻ Refresh
                </button>

              </div>

              <div className="table-container">

                <table>

                  <thead>

                    <tr>
                      <th>ID</th>
                      <th>Student ID</th>
                      <th>Amount</th>
                      <th>Fee Type</th>
                      <th>Payment Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>

                  </thead>

                  <tbody>

                    {fees.map((fee) => (

                      <tr key={fee.id}>

                        <td>
                          {fee.id}
                        </td>

                        <td>
                          {fee.studentId}
                        </td>

                        <td>
                          ₹{Number(fee.amount).toLocaleString("en-IN")}
                        </td>

                        <td>
                          {fee.feeType}
                        </td>

                        <td>
                          {fee.paymentDate}
                        </td>

                        <td>
                          <span className="status">
                            {fee.status}
                          </span>
                        </td>

                        <td>

                          <button
                            className="edit-btn"
                            onClick={() =>
                              startEditFee(fee)
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              deleteFee(fee.id)
                            }
                          >
                            Delete
                          </button>

                        </td>

                      </tr>

                    ))}

                    {fees.length === 0 && (

                      <tr>

                        <td colSpan="7">
                          No fee records found.
                        </td>

                      </tr>

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </section>

        )}

        {/* ================= COMPLAINTS ================= */}

        {activePage === "Complaints" && (
          <section className="module">
            <div className="module-header">
              <div>
                <h2>Complaint Management</h2>
                <p>Manage student hostel complaints.</p>
              </div>

              <button
                className="primary-btn"
                onClick={() => {
                  setEditingComplaint(null);
                  setComplaintForm({
                    studentId: "",
                    subject: "",
                    description: "",
                    createdDate: new Date().toISOString().split("T")[0],
                    status: "OPEN",
                  });
                  setShowComplaintForm(true);
                }}
              >
                + Add Complaint
              </button>
            </div>

            {showComplaintForm && (
              <form
                className="form-card"
                onSubmit={editingComplaint ? updateComplaint : addComplaint}
              >
                <h3>{editingComplaint ? "Update Complaint" : "Add Complaint"}</h3>

                <select
                  value={complaintForm.studentId}
                  onChange={(e) =>
                    setComplaintForm({
                      ...complaintForm,
                      studentId: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Select Student</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name} - {student.rollNo}
                    </option>
                  ))}
                </select>

                <input
                  placeholder="Subject"
                  value={complaintForm.subject}
                  onChange={(e) =>
                    setComplaintForm({
                      ...complaintForm,
                      subject: e.target.value,
                    })
                  }
                  required
                />

                <textarea
                  placeholder="Description"
                  value={complaintForm.description}
                  onChange={(e) =>
                    setComplaintForm({
                      ...complaintForm,
                      description: e.target.value,
                    })
                  }
                  required
                  rows="4"
                />

                <input
                  type="date"
                  value={complaintForm.createdDate}
                  onChange={(e) =>
                    setComplaintForm({
                      ...complaintForm,
                      createdDate: e.target.value,
                    })
                  }
                  required
                />

                <select
                  value={complaintForm.status}
                  onChange={(e) =>
                    setComplaintForm({
                      ...complaintForm,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="OPEN">OPEN</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="RESOLVED">RESOLVED</option>
                  <option value="CLOSED">CLOSED</option>
                </select>

                <div className="form-buttons">
                  <button type="submit" className="primary-btn">
                    {editingComplaint ? "Update Complaint" : "Save Complaint"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowComplaintForm(false);
                      setEditingComplaint(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="table-card">
              <div className="table-title">
                <h2>Complaints ({complaints.length})</h2>
                <button onClick={loadComplaints}>↻ Refresh</button>
              </div>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Student ID</th>
                      <th>Subject</th>
                      <th>Description</th>
                      <th>Created Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {complaints.map((complaint) => (
                      <tr key={complaint.id}>
                        <td>{complaint.id}</td>
                        <td>{complaint.studentId}</td>
                        <td>{complaint.subject}</td>
                        <td>{complaint.description}</td>
                        <td>{complaint.createdDate}</td>
                        <td>
                          <span className="status">{complaint.status}</span>
                        </td>
                        <td>
                          <button
                            className="edit-btn"
                            onClick={() => startEditComplaint(complaint)}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => deleteComplaint(complaint.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}

                    {complaints.length === 0 && (
                      <tr>
                        <td colSpan="7">No complaints found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ================= ATTENDANCE ================= */}

        {activePage === "Attendance" && (
          <section className="module">
            <div className="module-header">
              <div>
                <h2>Attendance Management</h2>
                <p>Manage student hostel attendance records.</p>
              </div>

              <button
                className="primary-btn"
                onClick={() => {
                  setEditingAttendance(null);
                  setAttendanceForm({
                    studentId: "",
                    date: new Date().toISOString().split("T")[0],
                    status: "PRESENT",
                  });
                  setShowAttendanceForm(true);
                }}
              >
                + Add Attendance
              </button>
            </div>

            {showAttendanceForm && (
              <form
                className="form-card"
                onSubmit={
                  editingAttendance ? updateAttendance : addAttendance
                }
              >
                <h3>
                  {editingAttendance ? "Update Attendance" : "Add Attendance"}
                </h3>

                <select
                  value={attendanceForm.studentId}
                  onChange={(e) =>
                    setAttendanceForm({
                      ...attendanceForm,
                      studentId: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Select Student</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name} - {student.rollNo}
                    </option>
                  ))}
                </select>

                <input
                  type="date"
                  value={attendanceForm.date}
                  onChange={(e) =>
                    setAttendanceForm({
                      ...attendanceForm,
                      date: e.target.value,
                    })
                  }
                  required
                />

                <select
                  value={attendanceForm.status}
                  onChange={(e) =>
                    setAttendanceForm({
                      ...attendanceForm,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="PRESENT">PRESENT</option>
                  <option value="ABSENT">ABSENT</option>
                </select>

                <div className="form-buttons">
                  <button type="submit" className="primary-btn">
                    {editingAttendance
                      ? "Update Attendance"
                      : "Save Attendance"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowAttendanceForm(false);
                      setEditingAttendance(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="table-card">
              <div className="table-title">
                <h2>Attendance Records ({attendance.length})</h2>
                <button onClick={loadAttendance}>↻ Refresh</button>
              </div>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Student ID</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {attendance.map((record) => (
                      <tr key={record.id}>
                        <td>{record.id}</td>
                        <td>{record.studentId}</td>
                        <td>{record.date}</td>
                        <td>
                          <span className="status">{record.status}</span>
                        </td>
                        <td>
                          <button
                            className="edit-btn"
                            onClick={() => startEditAttendance(record)}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => deleteAttendance(record.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}

                    {attendance.length === 0 && (
                      <tr>
                        <td colSpan="5">No attendance records found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ===================================================
            OTHER MODULES
            IMPORTANT:
            Room Allocations is excluded here.
        =================================================== */}

        {activePage !== "Dashboard" &&
          activePage !== "Students" &&
          activePage !== "Rooms" &&
          activePage !== "Room Allocations" &&
          activePage !== "Fees" &&
          activePage !== "Complaints" &&
          activePage !== "Attendance" && (

            <section className="coming">

              <div className="coming-icon">
                🚧
              </div>

              <h2>
                {activePage}
              </h2>

              <p>
                This module will be connected next.
              </p>

              <button
                onClick={() =>
                  setActivePage("Dashboard")
                }
              >
                ← Back to Dashboard
              </button>

            </section>

          )}

      </main>

    </div>
  );
}

export default App;