"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";

import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { FormFieldType } from "./PatientForm";


const AppointmentForm = () => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
  
    // 1. Define your form.
    const form = useForm<z.infer<typeof UserFormValidation>>({
      resolver: zodResolver(UserFormValidation),
      defaultValues: {
        name: "",
        email: "",
        phone: "",
      },
    });
  
    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
      // Do something with the form values.
      setIsLoading(true);
  
      try {
  
        // ========== User Data =============
        const user = {
          name: values.name,
          email: values.email,
          phone: values.phone,
        };
  
  
  
        // const newUser = await createUser(user);
  
        //   console.log(newUser.$id)
        // if (newUser) router.push(`/patients/${newUser.$id}/register`);
  
      } catch (err) {
        console.log(err);
      }
  
      // ✅ This will be type-safe and validated.
      // console.log(values);
    };



  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
      <section className="mb-12 space-y-4">
        <h1 className="header">New Appointment 👋</h1>
        <p className="text-dark-700">Request a New Appointment in 10 Seconds</p>
      </section>

      {/* ========== Full Name Field ================ */}
      <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="name"
        label="Full name"
        placeholder="John Doe"
        iconSrc="/assets/icons/user.svg"
        iconAlt="user"
      />
      {/* ========== Full Name Field ================ */}

      {/* ========== Email Field ================ */}
      <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="email"
        label="E-Mail Address"
        placeholder="example@gmail.com"
        iconSrc="/assets/icons/email.svg"
        iconAlt="email"
      />
      {/* ========== Email Field ================ */}

      {/* ========== Phone Number Field ================ */}
      <CustomFormField
        fieldType={FormFieldType.PHONE_INPUT}
        control={form.control}
        name="phone"
        label="Phone Number"
        placeholder="+880 123-4567890"
        iconSrc="/assets/icons/email.svg"
        iconAlt="email"
      />
      {/* ========== Phone Number Field ================ */}

      {/* ========= Submit Button ================ */}
      <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
    </form>
  </Form>
  );
};

export default AppointmentForm;
