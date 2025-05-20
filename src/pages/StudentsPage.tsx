import { useState } from "react";
import { UserPlus, Eye, Edit, Trash2 } from "lucide-react";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { students, formatCurrency, getStatusColor, Student } from "@/lib/dummyData";
import { Button } from "@/components/ui/button";
import { StudentFormModal, StudentFormValues } from "@/components/Students/StudentFormModal";
import { toast } from "sonner";
import { TableData } from "@/components/Table/TableData";

const StudentsPage = () => {
  const [filter, setFilter] = useState("all");
  const [studentsList, setStudentsList] = useState<Student[]>(students);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<StudentFormValues | undefined>(undefined);

  const filteredStudents = studentsList.filter((student) => {
    if (filter === "all") return true;
    return student.status === filter;
  });

  const handleAddStudent = () => {
    setIsEditing(false);
    setCurrentStudent(undefined);
    setIsModalOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setIsEditing(true);
    // setCurrentStudent({
    //   ...student,
    //   year: student.year.toString(),
    // });
    setIsModalOpen(true);
  };

  const handleDeleteStudent = (studentId: string) => {
    if (confirm("Are you sure you want to delete this student?")) {
      setStudentsList(studentsList.filter((student) => student.id !== studentId));
      toast.success("Student deleted successfully");
    }
  };

  const handleFormSubmit = (formData: StudentFormValues) => {
    if (isEditing && currentStudent) {
      setStudentsList(
        studentsList.map((student) =>
          student.id === currentStudent.id
            ? {
                ...student,
                ...formData,
                year: parseInt(formData.year),
                pendingAmount: formData.totalFees - formData.paidAmount,
              }
            : student
        )
      );
    } else {
      const newId = `STU${Math.floor(Math.random() * 10000)}`;
      const pendingAmount = formData.totalFees - formData.paidAmount;

      const newStudent: Student = {
        id: newId,
        rollNumber: formData.rollNumber,
        name: formData.name,
        course: formData.course,
        year: parseInt(formData.year),
        totalFees: formData.totalFees,
        paidAmount: formData.paidAmount,
        pendingAmount: pendingAmount,
        status: formData.status,
        dueDate: new Date().toISOString().split("T")[0],
      };

      setStudentsList([...studentsList, newStudent]);
    }

    toast.success(`Student ${isEditing ? "updated" : "added"} successfully`);
    setIsModalOpen(false);
  };

  const columns = [
    "Roll No.",
    "Name",
    "Course",
    "Year",
    "Total Fees",
    "Paid",
    "Pending",
    "Status",
    "Actions",
  ];

  const rows = filteredStudents.map((student) => ({
    ...student,
    totalFees: formatCurrency(student.totalFees),
    paidAmount: formatCurrency(student.paidAmount),
    pendingAmount: formatCurrency(student.pendingAmount),
    statusColor: getStatusColor(student.status),
  }));

  return (
    <div>
      <DashboardHeader title="Students" />

      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-wrap items-center gap-3">
          {["all", "paid", "partial", "overdue"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 text-sm rounded-md ${
                filter === status
                  ? status === "paid"
                    ? "bg-green-600 text-white"
                    : status === "overdue"
                    ? "bg-red-600 text-white"
                    : "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} Students
            </button>
          ))}
        </div>

        <Button onClick={handleAddStudent} className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          <span>Add Student</span>
        </Button>
      </div>

      {/* <TableData
        columns={columns}
        rows={rows}
        onEdit={handleEditStudent}
        onDelete={handleDeleteStudent}
        onView={(id) => console.log("View student", id)}
      /> */}

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{filteredStudents.length}</span> of{" "}
          <span className="font-medium">{studentsList.length}</span> students
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>

      <StudentFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleFormSubmit}
        defaultValues={currentStudent}
        isEditing={isEditing}
      />
    </div>
  );
};

export default StudentsPage;
