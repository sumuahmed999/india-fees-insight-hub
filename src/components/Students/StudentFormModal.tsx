
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/lib/dummyData";

export interface StudentFormValues {
  id?: string;
  rollNumber: string;
  name: string;
  course: string;
  year: string;
  totalFees: number;
  paidAmount: number;
  status: "paid" | "partial" | "overdue";
}

interface StudentFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: StudentFormValues) => void;
  defaultValues?: StudentFormValues;
  isEditing?: boolean;
}

export function StudentFormModal({
  open,
  onOpenChange,
  onSubmit,
  defaultValues = {
    rollNumber: "",
    name: "",
    course: "",
    year: "1",
    totalFees: 0,
    paidAmount: 0,
    status: "overdue",
  },
  isEditing = false,
}: StudentFormModalProps) {
  const form = useForm<StudentFormValues>({
    defaultValues,
  });

  useEffect(() => {
    if (open) {
      form.reset(defaultValues);
    }
  }, [open, defaultValues, form]);

  const handleSubmit = (values: StudentFormValues) => {
    onSubmit(values);
    toast.success(`Student ${isEditing ? "updated" : "added"} successfully`);
    onOpenChange(false);
  };

  // Calculate pending amount based on total fees and paid amount
  const totalFees = form.watch("totalFees") || 0;
  const paidAmount = form.watch("paidAmount") || 0;
  const pendingAmount = totalFees - paidAmount;

  // Update status based on payment amount
  useEffect(() => {
    let status: "paid" | "partial" | "overdue" = "overdue";
    
    if (totalFees > 0) {
      if (paidAmount >= totalFees) {
        status = "paid";
      } else if (paidAmount > 0) {
        status = "partial";
      }
    }
    
    form.setValue("status", status);
  }, [totalFees, paidAmount, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{isEditing ? "Edit Student" : "Add New Student"}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="rollNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roll Number</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. CS2023001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Student name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. B.Tech Computer Science" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1st Year</SelectItem>
                        <SelectItem value="2">2nd Year</SelectItem>
                        <SelectItem value="3">3rd Year</SelectItem>
                        <SelectItem value="4">4th Year</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="totalFees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Fees (₹)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paidAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paid Amount (₹)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-between items-center text-sm border-t pt-3 mt-2">
              <div>
                <span className="font-medium">Pending Amount:</span>{" "}
                <span className="text-red-600 font-medium">{formatCurrency(pendingAmount)}</span>
              </div>
              <div>
                <span className="font-medium">Status:</span>{" "}
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  form.watch("status") === "paid"
                    ? "bg-green-100 text-green-800"
                    : form.watch("status") === "partial"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {form.watch("status")}
                </span>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? "Update Student" : "Add Student"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
