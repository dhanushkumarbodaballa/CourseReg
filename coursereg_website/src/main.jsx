import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity, ArrowUpRight, BarChart3, BookOpen, Building2, CalendarDays,
  CheckCircle2, ChevronDown, ClipboardList, Clock3, GraduationCap,
  LayoutDashboard, Menu, Pencil, Plus, RefreshCw, Search, Settings2,
  ShieldCheck, Trash2, UserRound, Users, X, Database, FileBarChart2
} from "lucide-react";
import "./styles.css";

const departments = [
  { id: 1, name: "Computer Science and Engineering", description: "Focuses on algorithms, software architecture, databases, and AI systems", students: 5, faculty: 2, courses: 5 },
  { id: 2, name: "Information Technology", description: "Focuses on web application engineering, networks, and cloud computing", students: 4, faculty: 3, courses: 3 },
  { id: 3, name: "Electronics and Communication Engineering", description: "Focuses on embedded systems, microprocessors, and digital signal processing", students: 3, faculty: 2, courses: 2 },
  { id: 4, name: "Mechanical Engineering", description: "Focuses on thermodynamics, mechanics, robotics, and manufacturing", students: 2, faculty: 1, courses: 1 },
  { id: 5, name: "Electrical and Electronics Engineering", description: "Focuses on electrical power systems, machines, and control circuits", students: 1, faculty: 1, courses: 1 }
];

const instructors = [
  { id: 1, name: "Dr. Rajesh Sharma", email: "rajesh.sharma@aditya.ac.in", phone: "+91 98480 12341", department: "Computer Science and Engineering", sections: 2 },
  { id: 2, name: "Dr. Priya Nair", email: "priya.nair@aditya.ac.in", phone: "+91 98480 12342", department: "Computer Science and Engineering", sections: 2 },
  { id: 3, name: "Prof. Arun Kumar", email: "arun.kumar@aditya.ac.in", phone: "+91 98480 12343", department: "Information Technology", sections: 2 },
  { id: 4, name: "Dr. Sunita Reddy", email: "sunita.reddy@aditya.ac.in", phone: "+91 98480 12344", department: "Information Technology", sections: 1 },
  { id: 5, name: "Prof. Vikram Verma", email: "vikram.verma@aditya.ac.in", phone: "+91 98480 12345", department: "Electronics and Communication Engineering", sections: 1 },
  { id: 6, name: "Dr. Ananya Iyer", email: "ananya.iyer@aditya.ac.in", phone: "+91 98480 12346", department: "Electronics and Communication Engineering", sections: 1 },
  { id: 7, name: "Prof. Suresh Patil", email: "suresh.patil@aditya.ac.in", phone: "+91 98480 12347", department: "Mechanical Engineering", sections: 1 },
  { id: 8, name: "Dr. Ramesh Rao", email: "ramesh.rao@aditya.ac.in", phone: "+91 98480 12348", department: "Electrical and Electronics Engineering", sections: 1 },
  { id: 9, name: "Dr. Kavya Menon", email: "kavya.menon@aditya.ac.in", phone: "+91 98480 12349", department: "Computer Science and Engineering", sections: 1 }
];

const courses = [
  { id: 1, name: "Database Management Systems", credits: 4, department: "Computer Science and Engineering", sections: 2 },
  { id: 2, name: "Data Structures and Algorithms", credits: 4, department: "Computer Science and Engineering", sections: 1 },
  { id: 3, name: "Operating Systems", credits: 3, department: "Computer Science and Engineering", sections: 1 },
  { id: 4, name: "Computer Networks", credits: 3, department: "Information Technology", sections: 1 },
  { id: 5, name: "Web Technologies", credits: 3, department: "Information Technology", sections: 1 },
  { id: 6, name: "Software Engineering", credits: 3, department: "Information Technology", sections: 1 },
  { id: 7, name: "Digital Signal Processing", credits: 4, department: "Electronics and Communication Engineering", sections: 1 },
  { id: 8, name: "Microprocessors and Microcontrollers", credits: 3, department: "Electronics and Communication Engineering", sections: 1 },
  { id: 9, name: "Engineering Thermodynamics", credits: 4, department: "Mechanical Engineering", sections: 1 },
  { id: 10, name: "Power Systems Analysis", credits: 4, department: "Electrical and Electronics Engineering", sections: 1 },
  { id: 11, name: "Control Systems", credits: 3, department: "Electrical and Electronics Engineering", sections: 1 },
  { id: 12, name: "Engineering Mathematics", credits: 4, department: "Computer Science and Engineering", sections: 1 }
];

const students = [
  ["Rahul Verma","rahul.verma@student.ac.in","+91 97011 22331","2004-05-14","Computer Science and Engineering",3],
  ["Sneha Patel","sneha.patel@student.ac.in","+91 97011 22332","2004-08-22","Computer Science and Engineering",2],
  ["Amit Sharma","amit.sharma@student.ac.in","+91 97011 22333","2003-11-10","Computer Science and Engineering",2],
  ["Pooja Rao","pooja.rao@student.ac.in","+91 97011 22334","2004-02-18","Computer Science and Engineering",2],
  ["Rohan Nair","rohan.nair@student.ac.in","+91 97011 22335","2003-09-05","Information Technology",2],
  ["Neha Gupta","neha.gupta@student.ac.in","+91 97011 22336","2004-06-30","Information Technology",2],
  ["Karthik Reddy","karthik.reddy@student.ac.in","+91 97011 22337","2003-12-12","Information Technology",2],
  ["Priya Joshi","priya.joshi@student.ac.in","+91 97011 22338","2004-04-25","Electronics and Communication Engineering",2],
  ["Vikram Singh","vikram.singh@student.ac.in","+91 20011 12339","2003-07-17","Electronics and Communication Engineering",2],
  ["Divya Kumar","divya.kumar@student.ac.in","+91 20011 12340","2004-01-28","Electronics and Communication Engineering",1],
  ["Anjali Mishra","anjali.mishra@student.ac.in","+91 20011 12341","2004-09-09","Mechanical Engineering",2],
  ["Manoj Pillai","manoj.pillai@student.ac.in","+91 20011 12342","2003-03-03","Mechanical Engineering",2],
  ["Sai Teja","sai.teja@student.ac.in","+91 20011 12343","2004-10-11","Electrical and Electronics Engineering",2],
  ["Aditya Rao","aditya.rao@student.ac.in","+91 20011 12344","2003-06-08","Computer Science and Engineering",1],
  ["Meera Shah","meera.shah@student.ac.in","+91 20011 12345","2004-12-19","Information Technology",1]
].map((s,i)=>({id:i+1,name:s[0],email:s[1],phone:s[2],dob:s[3],department:s[4],registrations:s[5]}));

const sections = [
  {id:1,course:"Database Management Systems",credits:4,instructor:"Dr. Rajesh Sharma",term:"Fall 2025-2026",room:"LH-101",capacity:3,enrolled:3},
  {id:2,course:"Database Management Systems",credits:4,instructor:"Dr. Priya Nair",term:"Spring 2025-2026",room:"LH-102",capacity:30,enrolled:2},
  {id:3,course:"Data Structures and Algorithms",credits:4,instructor:"Dr. Rajesh Sharma",term:"Fall 2025-2026",room:"Lab-201",capacity:25,enrolled:3},
  {id:4,course:"Operating Systems",credits:3,instructor:"Dr. Priya Nair",term:"Spring 2025-2026",room:"LH-103",capacity:30,enrolled:0},
  {id:5,course:"Computer Networks",credits:3,instructor:"Prof. Arun Kumar",term:"Fall 2025-2026",room:"Lab-301",capacity:35,enrolled:3},
  {id:6,course:"Web Technologies",credits:3,instructor:"Dr. Sunita Reddy",term:"Spring 2025-2026",room:"Lab-302",capacity:30,enrolled:2},
  {id:7,course:"Software Engineering",credits:3,instructor:"Prof. Arun Kumar",term:"Fall 2025-2026",room:"LH-204",capacity:40,enrolled:2},
  {id:8,course:"Digital Signal Processing",credits:4,instructor:"Prof. Vikram Verma",term:"Fall 2025-2026",room:"Lab-401",capacity:35,enrolled:3},
  {id:9,course:"Microprocessors and Microcontrollers",credits:3,instructor:"Dr. Ananya Iyer",term:"Spring 2025-2026",room:"Lab-402",capacity:30,enrolled:2},
  {id:10,course:"Engineering Thermodynamics",credits:4,instructor:"Prof. Suresh Patil",term:"Fall 2025-2026",room:"ME-101",capacity:35,enrolled:2},
  {id:11,course:"Power Systems Analysis",credits:4,instructor:"Dr. Ramesh Rao",term:"Spring 2025-2026",room:"EE-201",capacity:30,enrolled:2}
];

const registrations = [
  [28,"Vikram Singh","Data Structures and Algorithms (Sec #3)","Dr. Rajesh Sharma","Fall 2025-2026","2026-09-30","COMPLETED","A"],
  [26,"Sai Teja","Power Systems Analysis (Sec #11)","Dr. Ramesh Rao","Spring 2025-2026","2025-08-12","REGISTERED","In Progress"],
  [25,"Anjali Mishra","Engineering Thermodynamics (Sec #10)","Prof. Suresh Patil","Fall 2025-2026","2025-08-11","REGISTERED","In Progress"],
  [24,"Manoj Pillai","Engineering Thermodynamics (Sec #10)","Prof. Suresh Patil","Fall 2025-2026","2025-08-11","REGISTERED","In Progress"],
  [23,"Vikram Singh","Microprocessors and Microcontrollers (Sec #9)","Dr. Ananya Iyer","Spring 2025-2026","2025-01-15","COMPLETED","A"],
  [22,"Priya Joshi","Microprocessors and Microcontrollers (Sec #9)","Dr. Ananya Iyer","Spring 2025-2026","2025-01-15","COMPLETED","B+"],
  [21,"Divya Kumar","Digital Signal Processing (Sec #8)","Prof. Vikram Verma","Fall 2025-2026","2025-08-10","REGISTERED","In Progress"],
  [20,"Vikram Singh","Digital Signal Processing (Sec #8)","Prof. Vikram Verma","Fall 2025-2026","2025-08-09","REGISTERED","In Progress"]
].map(r=>({id:r[0],student:r[1],course:r[2],instructor:r[3],term:r[4],date:r[5],status:r[6],grade:r[7]}));

const reports = {
  "Courses and their Departments": courses.map(c=>({ "COURSE ID":c.id, "COURSE NAME":c.name, "CREDITS":c.credits, "DEPARTMENT NAME":c.department })),
  "Department Enrollment": departments.map(d=>({ "DEPARTMENT":d.name, "STUDENTS":d.students, "FACULTY":d.faculty, "COURSES":d.courses })),
  "Section Capacity": sections.map(s=>({ "SECTION":`#${s.id}`, "COURSE":s.course, "CAPACITY":s.capacity, "ENROLLED":s.enrolled, "AVAILABLE":s.capacity-s.enrolled })),
  "Registration Summary": registrations.map(r=>({ "REG ID":`#${r.id}`, "STUDENT":r.student, "STATUS":r.status, "GRADE":r.grade, "TERM":r.term }))
};

const nav = [
  ["dashboard","Dashboard",LayoutDashboard],
  ["students","Students",GraduationCap],
  ["departments","Departments",Building2],
  ["instructors","Instructors",Users],
  ["courses","Courses",BookOpen],
  ["sections","Course Sections",CalendarDays],
  ["registrations","Registrations",ClipboardList],
  ["reports","Academic Reports",FileBarChart2]
];

function IconButton({title, children, danger=false, onClick}) {
  return <button title={title} aria-label={title} className={`icon-btn ${danger ? "danger" : ""}`} onClick={onClick}>{children}</button>;
}

function Modal({title, onClose, children}) {
  return <div className="modal-backdrop" onMouseDown={onClose}>
    <div className="modal" onMouseDown={e=>e.stopPropagation()}>
      <div className="modal-head"><h3>{title}</h3><IconButton title="Close" onClick={onClose}><X size={18}/></IconButton></div>
      {children}
    </div>
  </div>;
}

function App() {
  const [page,setPage] = useState("dashboard");
  const [mobileOpen,setMobileOpen] = useState(false);
  const [query,setQuery] = useState("");
  const [report,setReport] = useState("Courses and their Departments");
  const [refreshing,setRefreshing] = useState(false);
  const [modal,setModal] = useState(null);
  const [localStudents,setLocalStudents] = useState(students);
  const [localCourses,setLocalCourses] = useState(courses);
  const [localDepartments,setLocalDepartments] = useState(departments);
  const [localInstructors,setLocalInstructors] = useState(instructors);
  const [localSections,setLocalSections] = useState(sections);
  const [localRegistrations,setLocalRegistrations] = useState(registrations);

  const open = (type, item=null) => setModal({type,item});
  const close = () => setModal(null);

  const refresh = () => {
    setRefreshing(true);
    setTimeout(()=>setRefreshing(false),700);
  };

  const filtered = (arr, fields) => arr.filter(item => fields.some(f => String(item[f] ?? "").toLowerCase().includes(query.toLowerCase())));

  const handleDelete = (type,id) => {
    if (!confirm("Delete this record?")) return;
    if(type==="students") setLocalStudents(x=>x.filter(i=>i.id!==id));
    if(type==="courses") setLocalCourses(x=>x.filter(i=>i.id!==id));
    if(type==="departments") setLocalDepartments(x=>x.filter(i=>i.id!==id));
    if(type==="instructors") setLocalInstructors(x=>x.filter(i=>i.id!==id));
    if(type==="sections") setLocalSections(x=>x.filter(i=>i.id!==id));
    if(type==="registrations") setLocalRegistrations(x=>x.filter(i=>i.id!==id));
  };

  const save = (type,data) => {
    const id = modal?.item?.id ?? Date.now();
    const next = {...data,id};
    if(type==="students") setLocalStudents(a=>modal.item?a.map(x=>x.id===id?next:x):[...a,next]);
    if(type==="courses") setLocalCourses(a=>modal.item?a.map(x=>x.id===id?next:x):[...a,next]);
    if(type==="departments") setLocalDepartments(a=>modal.item?a.map(x=>x.id===id?next:x):[...a,next]);
    if(type==="instructors") setLocalInstructors(a=>modal.item?a.map(x=>x.id===id?next:x):[...a,next]);
    if(type==="sections") setLocalSections(a=>modal.item?a.map(x=>x.id===id?next:x):[...a,next]);
    if(type==="registrations") setLocalRegistrations(a=>modal.item?a.map(x=>x.id===id?next:x):[...a,next]);
    close();
  };

  const navTo = p => { setPage(p); setQuery(""); setMobileOpen(false); };

  return <div className="app-shell">
    <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
      <div className="brand">
        <div className="brand-mark"><Database size={22}/></div>
        <div><div className="brand-name">CourseReg</div><div className="brand-tag">Oracle 23ai</div></div>
      </div>
      <nav className="nav-list">
        {nav.map(([id,label,Icon]) => <button key={id} className={`nav-item ${page===id ? "active":""}`} onClick={()=>navTo(id)}>
          <Icon size={18}/><span>{label}</span>
        </button>)}
      </nav>
      <div className="sidebar-foot">
        <div>B.Tech CSE DBMS Project</div>
        <div className="connected"><span></span> Connected: FREEPDB1</div>
      </div>
    </aside>

    {mobileOpen && <div className="mobile-overlay" onClick={()=>setMobileOpen(false)} />}

    <main className="main">
      <header className="topbar">
        <button className="mobile-menu" onClick={()=>setMobileOpen(true)}><Menu size={20}/></button>
        <div className="topbar-spacer" />
        <button className="refresh-btn" onClick={refresh}><RefreshCw size={16} className={refreshing?"spin":""}/> Refresh Data</button>
      </header>

      <div className="content">
        {page==="dashboard" && <Dashboard sections={localSections} students={localStudents} onNavigate={navTo} />}
        {page==="students" && <Students data={filtered(localStudents,["name","email","department"])} query={query} setQuery={setQuery} open={open} del={id=>handleDelete("students",id)} />}
        {page==="departments" && <Departments data={filtered(localDepartments,["name","description"])} open={open} del={id=>handleDelete("departments",id)} query={query} setQuery={setQuery}/>}
        {page==="instructors" && <Instructors data={filtered(localInstructors,["name","email","department"])} open={open} del={id=>handleDelete("instructors",id)} query={query} setQuery={setQuery}/>}
        {page==="courses" && <Courses data={filtered(localCourses,["name","department"])} open={open} del={id=>handleDelete("courses",id)} query={query} setQuery={setQuery}/>}
        {page==="sections" && <Sections data={filtered(localSections,["course","instructor","term","room"])} open={open} del={id=>handleDelete("sections",id)} query={query} setQuery={setQuery}/>}
        {page==="registrations" && <Registrations data={filtered(localRegistrations,["student","course","instructor","term","status"])} open={open} del={id=>handleDelete("registrations",id)} query={query} setQuery={setQuery}/>}
        {page==="reports" && <Reports report={report} setReport={setReport} />}
      </div>
    </main>

    {modal && <CrudModal modal={modal} close={close} save={save} departments={localDepartments} courses={localCourses} instructors={localInstructors} sections={localSections}/>}
  </div>;
}

function PageHead({title,subtitle,action}) {
  return <div className="page-head">
    <div><h1>{title}</h1><p>{subtitle}</p></div>
    {action}
  </div>
}

function SearchBar({value,onChange,placeholder}) {
  return <div className="search-wrap"><Search size={17}/><input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/>{value && <button onClick={()=>onChange("")}><X size={15}/></button>}</div>
}

function Dashboard({sections,students,onNavigate}) {
  const metrics = [
    ["Total Students",students.length,GraduationCap],
    ["Departments",departments.length,Building2],
    ["Instructors",instructors.length,Users],
    ["Total Courses",courses.length,BookOpen],
    ["Course Sections",sections.length,CalendarDays],
    ["Total Registrations",27,ClipboardList]
  ];
  return <>
    <PageHead title="System Dashboard" subtitle="Academic Overview & Operational Metrics" />
    <div className="metric-grid">{metrics.map(([label,value,Icon])=><div className="metric-card" key={label}>
      <div className="metric-icon"><Icon size={19}/></div><div><div className="metric-label">{label}</div><div className="metric-value">{value}</div></div>
    </div>)}</div>
    <div className="dashboard-grid">
      <section className="panel">
        <div className="panel-head"><div><h2>Section Capacity Highlights</h2><p>Live enrollment and capacity snapshot</p></div><button className="link-btn">View All <ArrowUpRight size={15}/></button></div>
        <div className="table-scroll"><table><thead><tr><th>Section</th><th>Course</th><th>Term</th><th>Capacity</th><th>Enrolled</th><th>Status</th></tr></thead>
        <tbody>{sections.slice(0,5).map(s=><tr key={s.id}><td>#{s.id}</td><td>{s.course}</td><td>{s.term}</td><td>{s.capacity}</td><td>{s.enrolled}</td><td><Status full={s.enrolled>=s.capacity}>{s.enrolled>=s.capacity?"FULL":"AVAILABLE"}</Status></td></tr>)}</tbody></table></div>
      </section>
      <section className="panel quick-panel">
        <div className="panel-head"><div><h2>Quick Actions</h2><p>Common administration tasks</p></div></div>
        <div className="quick-actions">
          <QuickAction icon={ClipboardList} label="New Student Registration" onClick={()=>onNavigate("registrations")} />
          <QuickAction icon={GraduationCap} label="Register New Student" onClick={()=>onNavigate("students")} />
          <QuickAction icon={CalendarDays} label="Schedule New Section" onClick={()=>onNavigate("sections")} />
          <QuickAction icon={BarChart3} label="Open Analytical Reports" onClick={()=>onNavigate("reports")} />
        </div>
      </section>
    </div>
  </>;
}

function QuickAction({icon:Icon,label,onClick}) { return <button className="quick-action" onClick={onClick}><Icon size={17}/><span>{label}</span></button> }
function Status({children,full}) { return <span className={`status ${full?"full":"available"}`}>{children}</span> }

function Students({data,query,setQuery,open,del}) {
  return <><PageHead title="Student Management" subtitle="Enrolled Students & Academic Records" action={<button className="primary" onClick={()=>open("students")}><Plus size={17}/> Add Student</button>}/>
    <section className="panel"><div className="toolbar"><SearchBar value={query} onChange={setQuery} placeholder="Search by name, email, or department..." /></div>
    <DataTable headers={["ID","Student Name","Email","Phone","DOB","Department","Registrations","Actions"]}>
      {data.map(s=><tr key={s.id}><td>{s.id}</td><td className="strong">{s.name}</td><td>{s.email}</td><td>{s.phone}</td><td>{s.dob}</td><td>{s.department}</td><td><span className="count-pill">{s.registrations} ENROLLED</span></td><td><Actions edit={()=>open("students",s)} del={()=>del(s.id)}/></td></tr>)}
    </DataTable></section></>
}

function Departments({data,open,del,query,setQuery}) {
  return <><PageHead title="Department Management" subtitle="Academic Faculties & Divisions" action={<button className="primary" onClick={()=>open("departments")}><Plus size={17}/> Add Department</button>}/>
  <section className="panel"><div className="toolbar"><div></div></div><DataTable headers={["ID","Department Name","Description","Students","Faculty","Courses","Actions"]}>
    {data.map(d=><tr key={d.id}><td>{d.id}</td><td className="strong">{d.name}</td><td>{d.description}</td><td>{d.students}</td><td>{d.faculty}</td><td>{d.courses}</td><td><Actions edit={()=>open("departments",d)} del={()=>del(d.id)}/></td></tr>)}
  </DataTable></section></>
}

function Instructors({data,open,del,query,setQuery}) {
  return <><PageHead title="Instructor Management" subtitle="Faculty Profiles & Teaching Assignments" action={<button className="primary" onClick={()=>open("instructors")}><Plus size={17}/> Add Instructor</button>}/>
  <section className="panel"><div className="toolbar"><SearchBar value={query} onChange={setQuery} placeholder="Search instructors..." /></div><DataTable headers={["ID","Instructor Name","Email","Phone","Department","Sections Taught","Actions"]}>
    {data.map(i=><tr key={i.id}><td>{i.id}</td><td className="strong">{i.name}</td><td>{i.email}</td><td>{i.phone}</td><td>{i.department}</td><td>{i.sections}</td><td><Actions edit={()=>open("instructors",i)} del={()=>del(i.id)}/></td></tr>)}
  </DataTable></section></>
}

function Courses({data,open,del,query,setQuery}) {
  return <><PageHead title="Course Catalog" subtitle="Curriculum Syllabi & Credit Weightings" action={<button className="primary" onClick={()=>open("courses")}><Plus size={17}/> Add Course</button>}/>
  <section className="panel"><div className="toolbar"><SearchBar value={query} onChange={setQuery} placeholder="Search courses..." /></div><DataTable headers={["ID","Course Name","Credits","Department","Sections","Actions"]}>
    {data.map(c=><tr key={c.id}><td>{c.id}</td><td className="strong">{c.name}</td><td>{c.credits} Credits</td><td>{c.department}</td><td>{c.sections}</td><td><Actions edit={()=>open("courses",c)} del={()=>del(c.id)}/></td></tr>)}
  </DataTable></section></>
}

function Sections({data,open,del,query,setQuery}) {
  return <><PageHead title="Course Sections" subtitle="Scheduled Offerings, Venues & Seat Allocations" action={<button className="primary" onClick={()=>open("sections")}><Plus size={17}/> Schedule Section</button>}/>
  <section className="panel"><div className="toolbar"><SearchBar value={query} onChange={setQuery} placeholder="Search course, instructor, term or room..." /></div><DataTable headers={["Sec ID","Course Name","Credits","Instructor","Term / Year","Room","Capacity","Enrolled","Available","Status","Actions"]}>
    {data.map(s=>{const available=s.capacity-s.enrolled; return <tr key={s.id}><td>#{s.id}</td><td>{s.course}</td><td>{s.credits}</td><td>{s.instructor}</td><td>{s.term}</td><td>{s.room}</td><td>{s.capacity}</td><td>{s.enrolled}</td><td>{available}</td><td><Status full={available===0}>{available===0?"FULL":"AVAILABLE"}</Status></td><td><Actions edit={()=>open("sections",s)} del={()=>del(s.id)}/></td></tr>})}
  </DataTable></section></>
}

function Registrations({data,open,del,query,setQuery}) {
  return <><PageHead title="Registration Management" subtitle="Course Enrollments, Grade Records & Capacity" action={<button className="primary" onClick={()=>open("registrations")}><Plus size={17}/> Register Student</button>}/>
  <section className="panel"><div className="toolbar"><SearchBar value={query} onChange={setQuery} placeholder="Search registrations..." /></div><DataTable headers={["Reg ID","Student","Course","Instructor","Term","Reg Date","Status","Grade","Actions"]}>
    {data.map(r=><tr key={r.id}><td>#{r.id}</td><td>{r.student}</td><td>{r.course}</td><td>{r.instructor}</td><td>{r.term}</td><td>{r.date}</td><td><Status full={r.status==="COMPLETED"}>{r.status}</Status></td><td>{r.grade}</td><td><Actions edit={()=>open("registrations",r)} del={()=>del(r.id)} cancel /></td></tr>)}
  </DataTable></section></>
}

function Reports({report,setReport}) {
  const rows = reports[report] || [];
  const headers = rows.length ? Object.keys(rows[0]) : [];
  return <><PageHead title="Academic Reports" subtitle="DBMS Analytics, Joins, Aggregations & Groupings"/>
  <section className="panel report-selector"><label>Select Academic Report:</label><select value={report} onChange={e=>setReport(e.target.value)}>{Object.keys(reports).map(r=><option key={r}>{r}</option>)}</select></section>
  <section className="panel"><div className="panel-head"><div><h2>{Object.keys(reports).indexOf(report)+1}. {report}</h2></div><span className="rows-returned">{rows.length} ROWS RETURNED</span></div>
  <DataTable headers={headers}>{rows.map((row,i)=><tr key={i}>{headers.map(h=><td key={h}>{row[h]}</td>)}</tr>)}</DataTable></section></>
}

function DataTable({headers,children}) {
  return <div className="table-scroll"><table><thead><tr>{headers.map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{children}</tbody></table></div>
}
function Actions({edit,del,cancel=false}) { return <div className="actions"><button className="small-btn" onClick={edit}><Pencil size={14}/> Edit</button><button className={`small-btn ${cancel?"cancel":""}`} onClick={del}>{cancel?"Cancel":<><Trash2 size={14}/> Delete</>}</button></div> }

function Field({label,children}) { return <label className="field"><span>{label}</span>{children}</label> }
function Input({value,onChange,type="text",placeholder=""}) { return <input value={value ?? ""} onChange={e=>onChange(e.target.value)} type={type} placeholder={placeholder}/> }

function CrudModal({modal,close,save,departments,courses,instructors,sections}) {
  const t=modal.type, item=modal.item;
  const [form,setForm]=useState(()=>item ? {...item} : t==="students"
    ? {name:"",email:"",phone:"",dob:"",department:departments[0]?.name||"",registrations:0}
    : t==="departments" ? {name:"",description:"",students:0,faculty:0,courses:0}
    : t==="instructors" ? {name:"",email:"",phone:"",department:departments[0]?.name||"",sections:0}
    : t==="courses" ? {name:"",credits:3,department:departments[0]?.name||"",sections:0}
    : t==="sections" ? {course:courses[0]?.name||"",credits:3,instructor:instructors[0]?.name||"",term:"Fall 2026-2027",room:"LH-101",capacity:30,enrolled:0}
    : {student:"",course:courses[0]?.name||"",instructor:instructors[0]?.name||"",term:"Fall 2026-2027",date:new Date().toISOString().slice(0,10),status:"REGISTERED",grade:"In Progress"});
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const title = `${item?"Edit":"Add"} ${t==="students"?"Student":t==="departments"?"Department":t==="instructors"?"Instructor":t==="courses"?"Course":t==="sections"?"Course Section":"Registration"}`;
  const commonDept = <Field label="Department"><select value={form.department} onChange={e=>set("department",e.target.value)}>{departments.map(d=><option key={d.id}>{d.name}</option>)}</select></Field>;
  return <Modal title={title} onClose={close}>
    <div className="form-grid">
      {t==="students" && <><Field label="Student Name"><Input value={form.name} onChange={v=>set("name",v)} /></Field><Field label="Email"><Input value={form.email} onChange={v=>set("email",v)} /></Field><Field label="Phone"><Input value={form.phone} onChange={v=>set("phone",v)} /></Field><Field label="Date of Birth"><Input value={form.dob} onChange={v=>set("dob",v)} type="date"/></Field>{commonDept}</>}
      {t==="departments" && <><Field label="Department Name"><Input value={form.name} onChange={v=>set("name",v)}/></Field><Field label="Description"><Input value={form.description} onChange={v=>set("description",v)}/></Field><Field label="Students"><Input value={form.students} onChange={v=>set("students",Number(v))} type="number"/></Field><Field label="Faculty"><Input value={form.faculty} onChange={v=>set("faculty",Number(v))} type="number"/></Field><Field label="Courses"><Input value={form.courses} onChange={v=>set("courses",Number(v))} type="number"/></Field></>}
      {t==="instructors" && <><Field label="Instructor Name"><Input value={form.name} onChange={v=>set("name",v)}/></Field><Field label="Email"><Input value={form.email} onChange={v=>set("email",v)}/></Field><Field label="Phone"><Input value={form.phone} onChange={v=>set("phone",v)}/></Field>{commonDept}<Field label="Sections Taught"><Input value={form.sections} onChange={v=>set("sections",Number(v))} type="number"/></Field></>}
      {t==="courses" && <><Field label="Course Name"><Input value={form.name} onChange={v=>set("name",v)}/></Field><Field label="Credits"><Input value={form.credits} onChange={v=>set("credits",Number(v))} type="number"/></Field>{commonDept}<Field label="Sections"><Input value={form.sections} onChange={v=>set("sections",Number(v))} type="number"/></Field></>}
      {t==="sections" && <><Field label="Course"><select value={form.course} onChange={e=>{set("course",e.target.value);set("credits",courses.find(c=>c.name===e.target.value)?.credits||3)}}>{courses.map(c=><option key={c.id}>{c.name}</option>)}</select></Field><Field label="Instructor"><select value={form.instructor} onChange={e=>set("instructor",e.target.value)}>{instructors.map(i=><option key={i.id}>{i.name}</option>)}</select></Field><Field label="Term / Year"><Input value={form.term} onChange={v=>set("term",v)}/></Field><Field label="Room"><Input value={form.room} onChange={v=>set("room",v)}/></Field><Field label="Capacity"><Input value={form.capacity} onChange={v=>set("capacity",Number(v))} type="number"/></Field><Field label="Enrolled"><Input value={form.enrolled} onChange={v=>set("enrolled",Number(v))} type="number"/></Field></>}
      {t==="registrations" && <><Field label="Student"><Input value={form.student} onChange={v=>set("student",v)} /></Field><Field label="Course"><select value={form.course} onChange={e=>set("course",e.target.value)}>{courses.map(c=><option key={c.id}>{c.name}</option>)}</select></Field><Field label="Instructor"><select value={form.instructor} onChange={e=>set("instructor",e.target.value)}>{instructors.map(i=><option key={i.id}>{i.name}</option>)}</select></Field><Field label="Term"><Input value={form.term} onChange={v=>set("term",v)}/></Field><Field label="Registration Date"><Input value={form.date} onChange={v=>set("date",v)} type="date"/></Field><Field label="Status"><select value={form.status} onChange={e=>set("status",e.target.value)}><option>REGISTERED</option><option>COMPLETED</option></select></Field><Field label="Grade"><Input value={form.grade} onChange={v=>set("grade",v)}/></Field></>}
    </div>
    <div className="modal-actions"><button className="secondary" onClick={close}>Cancel</button><button className="primary" onClick={()=>save(t,form)}><CheckCircle2 size={16}/> Save</button></div>
  </Modal>
}

createRoot(document.getElementById("root")).render(<App />);
