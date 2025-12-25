"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, BookOpen, CalendarDays } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function AccountingBooksSection() {
  const [books, setBooks] = useState([
    {
      id: 1,
      name: "Dearie Bar Book",
      department: "Bar",
      fiscalYear: "Apr 2025 - Mar 2026",
      balance: 135000,
      status: "active",
    },
    {
      id: 2,
      name: "Dearie Hotel Book",
      department: "Hotel",
      fiscalYear: "Apr 2025 - Mar 2026",
      balance: 285000,
      status: "active",
    },
    {
      id: 3,
      name: "Dearie Restaurant Book",
      department: "Restaurant",
      fiscalYear: "Apr 2025 - Mar 2026",
      balance: 78000,
      status: "inactive",
    },
  ]);

  const [newBook, setNewBook] = useState({
    name: "",
    department: "",
    fiscalYear: "",
  });

  const handleAddBook = () => {
    if (!newBook.name || !newBook.department || !newBook.fiscalYear) return;
    setBooks([
      ...books,
      {
        id: books.length + 1,
        name: newBook.name,
        department: newBook.department,
        fiscalYear: newBook.fiscalYear,
        balance: 0,
        status: "active",
      },
    ]);
    setNewBook({ name: "", department: "", fiscalYear: "" });
  };

  const toggleStatus = (id: number) => {
    setBooks(
      books.map((book) =>
        book.id === id
          ? { ...book, status: book.status === "active" ? "inactive" : "active" }
          : book
      )
    );
  };

  const deleteBook = (id: number) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 🧭 Header */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <BookOpen className="h-5 w-5 text-primary" />
            Accounting Books Management
          </CardTitle>
          <CardDescription>
            Manage separate accounting books for each department or business unit.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* ➕ Add New Book Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="self-end">
            <Plus className="h-4 w-4 mr-2" /> Add New Book
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Accounting Book</DialogTitle>
            <DialogDescription>
              Set up a new accounting book for a department or division.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3 py-2">
            <div>
              <label className="text-sm font-medium">Book Name</label>
              <Input
                placeholder="e.g., Dearie Events Book"
                value={newBook.name}
                onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Department</label>
              <Select
                value={newBook.department}
                onValueChange={(val) => setNewBook({ ...newBook, department: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bar">Bar</SelectItem>
                  <SelectItem value="Hotel">Hotel</SelectItem>
                  <SelectItem value="Restaurant">Restaurant</SelectItem>
                  <SelectItem value="Banquet">Banquet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Fiscal Year</label>
              <Input
                placeholder="e.g., Apr 2025 - Mar 2026"
                value={newBook.fiscalYear}
                onChange={(e) => setNewBook({ ...newBook, fiscalYear: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleAddBook}>Create Book</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 📘 Books List */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Existing Accounting Books
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Fiscal Year</TableHead>
                <TableHead className="text-right">Balance (₹)</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium">{book.name}</TableCell>
                  <TableCell>{book.department}</TableCell>
                  <TableCell className="text-muted-foreground">
                    <CalendarDays className="inline h-4 w-4 mr-1 text-muted-foreground" />
                    {book.fiscalYear}
                  </TableCell>
                  <TableCell className="text-right text-green-700 font-semibold">
                    ₹{book.balance.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={`${
                        book.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {book.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => toggleStatus(book.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => deleteBook(book.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
