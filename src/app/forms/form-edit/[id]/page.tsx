"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;

  isNew?: boolean;
}

export default function FormEditUserPage() {
  const router = useRouter();
  const params = useParams();

  const userId = params?.id;

  const [formData, setFormData] = useState<Partial<User>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const res = await fetch("https://dummyjson.com/users");
          const apiData = await res.json();

          const stored = localStorage.getItem("usersLocal");
          const usersLocal: User[] = stored ? JSON.parse(stored) : [];

          const usersLocalWithFlag = usersLocal.map((u: any) => ({
            ...u,
            isNew: true,
          }));

          const mergedUsers = [...usersLocalWithFlag, ...apiData.users];

          const userToEdit = mergedUsers.find(
            (user) => Number(user.id) === Number(userId),
          );

          if (userToEdit) {
            setFormData(userToEdit);
          } else {
            alert("User not found!");
            router.push("/");
          }
        } catch (err) {
          console.error("Failed to fetch users:", err);
          alert("Failed to load user data.");
          router.push("/");
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [userId, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone
    ) {
      alert("Semua field harus diisi!");
      return;
    }

    const stored = localStorage.getItem("usersLocal");
    let usersLocal = stored ? JSON.parse(stored) : [];

    const updatedUsers = usersLocal.map((user: User) => {
      if (Number(user.id) === Number(userId)) {
        return {
          ...user,
          ...formData,
        };
      }
      return user;
    });

    localStorage.setItem("usersLocal", JSON.stringify(updatedUsers));

    alert("User updated successfully!");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Breadcrumb pageName="Form Edit User" />

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1">
          <div className="flex flex-col gap-9">
            <ShowcaseSection
              title="Personal Info"
              className="space-y-5.5 !p-6.5"
            >
              <div>
                <InputGroup
                  label="First Name"
                  placeholder="Enter first name"
                  type="text"
                  name="firstName"
                  value={formData.firstName || ""}
                  handleChange={handleChange}
                />
              </div>

              <div>
                <InputGroup
                  label="Last Name"
                  placeholder="Enter last name"
                  type="text"
                  name="lastName"
                  value={formData.lastName || ""}
                  handleChange={handleChange}
                />
              </div>

              <div>
                <InputGroup
                  label="Email"
                  placeholder="Enter email"
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  handleChange={handleChange}
                />
              </div>

              <div>
                <InputGroup
                  label="Phone Number"
                  placeholder="Enter phone number"
                  type="text"
                  name="phone"
                  value={formData.phone || ""}
                  handleChange={handleChange}
                />
              </div>

              <Button
                label="Save Changes"
                variant="primary"
                shape="rounded"
                // type="submit"
              />
            </ShowcaseSection>
          </div>
        </div>
      </form>
    </>
  );
}
