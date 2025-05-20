
import { useState } from "react";
import { UserPlus, Edit, Trash2, Eye } from "lucide-react";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { students, formatCurrency, getStatusColor, Student } from "@/lib/dummyData";
import { Button } from "@/components/ui/button";
import { StudentFormModal, StudentFormValues } from "@/components/Students/StudentFormModal";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    // Convert the student object to match StudentFormValues type (year as string)
    setCurrentStudent({
      ...student,
      year: student.year.toString() // Convert number to string
    });
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
      // Update existing student
      setStudentsList(
        studentsList.map((student) =>
          student.id === currentStudent.id ? {
            ...student,
            ...formData,
            year: parseInt(formData.year), // Convert string to number
            pendingAmount: formData.totalFees - formData.paidAmount
          } : student
        )
      );
    } else {
      // Add new student with a generated ID
      const newId = `STU${Math.floor(Math.random() * 10000)}`;
      const pendingAmount = formData.totalFees - formData.paidAmount;
      
      // Create a new student with all required properties for the Student type
      const newStudent: Student = {
        id: newId,
        rollNumber: formData.rollNumber,
        name: formData.name,
        course: formData.course,
        year: parseInt(formData.year), // Convert string to number
        totalFees: formData.totalFees,
        paidAmount: formData.paidAmount,
        pendingAmount: pendingAmount,
        status: formData.status,
        dueDate: new Date().toISOString().split('T')[0] // Set today's date as dueDate
      };
      
      setStudentsList([...studentsList, newStudent]);
    }
    
    toast.success(`Student ${isEditing ? "updated" : "added"} successfully`);
    setIsModalOpen(false);
  };

  return (
    <div>
      <DashboardHeader title="Students" />
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 text-sm rounded-md ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Students
          </button>
          <button
            onClick={() => setFilter("paid")}
            className={`px-4 py-2 text-sm rounded-md ${
              filter === "paid"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Paid
          </button>
          <button
            onClick={() => setFilter("partial")}
            className={`px-4 py-2 text-sm rounded-md ${
              filter === "partial"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Partial
          </button>
          <button
            onClick={() => setFilter("overdue")}
            className={`px-4 py-2 text-sm rounded-md ${
              filter === "overdue"
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Overdue
          </button>
        </div>
        
        <Button onClick={handleAddStudent} className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          <span>Add Student</span>
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Total Fees</TableHead>
                <TableHead>Paid</TableHead>
                <TableHead>Pending</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{student.rollNumber}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.course}</TableCell>
                    <TableCell>{student.year}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(student.totalFees)}</TableCell>
                    <TableCell className="text-green-700 font-medium">{formatCurrency(student.paidAmount)}</TableCell>
                    <TableCell className="text-red-600 font-medium">{formatCurrency(student.pendingAmount)}</TableCell>
                    <TableCell>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(student.status)}`}>
                        {student.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => console.log("View student", student.id)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEditStudent(student)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteStudent(student.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-6 text-gray-500">
                    No students found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
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
      </div>
      
      {/* Student Form Modal */}
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
