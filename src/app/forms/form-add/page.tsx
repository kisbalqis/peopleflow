"use client";


import { useRouter } from "next/navigation";
import { useState } from "react";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";


export default function FormElementsPage() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (formData: FormData) => {
    const newErrors: Record<string, string> = {};

    const fullName = formData.get("fullName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;

    if (!fullName || !fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!lastName || !lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!email || !email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!phone || !phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]+$/.test(phone)) {
      newErrors.phone = "Phone must be digits only";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!validate(formData)) return;

    const newUser = {
      id: Date.now(),
      firstName: formData.get("fullName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      image: "https://i.pravatar.cc/150?u=" + formData.get("email"),
    };

    const stored = localStorage.getItem("usersLocal");
    const usersLocal = stored ? JSON.parse(stored) : [];
    localStorage.setItem("usersLocal", JSON.stringify([...usersLocal, newUser]));

    alert("User saved successfully!");
    router.push("/");
  };

  return (
    <>
      <Breadcrumb pageName="Form Add User" />

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1">
          <div className="flex flex-col gap-9">
            <ShowcaseSection title="Personal Info" className="space-y-5.5 !p-6.5">
              <div>
                <InputGroup
                  label="Full Name"
                  placeholder="Enter full name"
                  type="text"
                  name="fullName"
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>

              <div>
                <InputGroup
                  label="Last Name"
                  placeholder="Enter last name"
                  type="text"
                  name="lastName"
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>

              <div>
                <InputGroup
                  label="Email"
                  placeholder="Enter email"
                  type="email"
                  name="email"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <InputGroup
                  label="Phone Number"
                  placeholder="Enter phone number"
                  type="number"
                  name="phone"
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              <Button
                label="Save User"
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
