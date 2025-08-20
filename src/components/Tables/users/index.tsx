"use client";

import { SearchIcon } from "@/assets/icons";
import { Button } from "@/components/ui-elements/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  image: string;
  isNew?: boolean;
  is_active?: boolean; // Menambahkan properti is_active
}

export function UsersFetch({ className }: { className?: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://dummyjson.com/users");
        const data = await res.json();
        const stored = localStorage.getItem("usersLocal");
        const usersLocal = stored ? JSON.parse(stored) : [];
        const usersLocalWithFlag = usersLocal.map((u: any) => ({
          ...u,
          isNew: true,
        }));

        const merged = [...usersLocalWithFlag, ...data.users];
        setUsers(merged);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = (id: number) => {
    const stored = localStorage.getItem("usersLocal");
    const usersLocal = stored ? JSON.parse(stored) : [];
    const updatedUsers = usersLocal.map((user: User) => {
      if (Number(user.id) === Number(id)) {
        return {
          ...user,
          is_active: false, 
        };
      }
      return user;
    });

    localStorage.setItem("usersLocal", JSON.stringify(updatedUsers));
    
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        Number(user.id) === Number(id) ? { ...user, is_active: false } : user
      )
    );
  };

  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    const isActive = user.is_active !== false;

    return (
      isActive &&
      (`${user.firstName} ${user.lastName}`.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.phone.toLowerCase().includes(term))
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div
      className={cn(
        "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="relative w-full max-w-[300px]">
          <input
            type="search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="flex w-full items-center gap-3.5 rounded-full border bg-gray-2 py-3 pl-[53px] pr-5 outline-none transition-colors focus-visible:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-dark-4 dark:hover:bg-dark-3 dark:hover:text-dark-6 dark:focus-visible:border-primary"
          />
          <SearchIcon className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 max-[1015px]:size-5" />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-none uppercase [&>th]:text-center">
            <TableHead className="!text-left">Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedUsers.map((user) => (
            <TableRow
              className="text-center text-base font-medium text-dark dark:text-white"
              key={user.id}
            >
              <TableCell className="flex items-center gap-3 !text-left">
                <Image
                  src={user.image}
                  className="size-8 rounded-full object-cover"
                  width={40}
                  height={40}
                  alt={user.firstName + " " + user.lastName}
                  role="presentation"
                />
                <div className="flex items-center gap-2">
                  {user.firstName} {user.lastName}
                  {user.isNew && (
                    <span className="ml-2 rounded-full bg-green-500 px-2 py-0.5 text-xs font-semibold text-white">
                      New
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell className="flex space-x-2">
                <Link href={`/form/form-edit/${user.id}`}>
                  <Button label="Edit" variant="primary" shape="rounded" />
                </Link>
                <Button
                  label="Delete"
                  variant="outlinePrimary"
                  shape="rounded"
                  onClick={() => handleDelete(user.id)}
                />
              </TableCell>
            </TableRow>
          ))}

          {paginatedUsers.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="py-6 text-center">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="px-2">
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
}
