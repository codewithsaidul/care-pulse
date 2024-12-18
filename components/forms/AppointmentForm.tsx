"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";

import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { Dispatch, SetStateAction, useState } from "react";
import { getAppointmentSchema } from "@/lib/validation";
import { FormFieldType } from "./PatientForm";
import Image from "next/image";
import { Doctors } from "@/constants";
import { SelectItem } from "../ui/select";
import {
  createAppointment,
  updateAppointment,
} from "@/lib/actions/appointment.actions";
import { useRouter } from "next/navigation";
import { Appointment } from "@/types/appwrite.types";


const AppointmentForm = ({
  userId,
  patientId,
  type,
  appointment,
  setOpen,
}: {
  userId: string;
  patientId: string;
  type: "create" | "cancel" | "schedule";
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const AppointmentFormValidation = getAppointmentSchema(type);


  // 1. Define your form.
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment.primaryPhysician : "",
      schedule: appointment && appointment ? new Date(appointment?.schedule) : new Date(),
      reason: appointment ? appointment.reason : "",
      note: appointment ? appointment.note : "",
      cancellationReason:  appointment?.cancellationReason || "",
    },
  });



  // 2. Define a submit handler.
  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation>
  ) => {
    // Do something with the form values.
    setIsLoading(true);

    let status;

    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      case "create":
        status = "pending";
        break;
      default:
        break;
    }

    try {
      // ============ Create New Appointment =========================
      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status: status as Status,
        };

        const appointment = await createAppointment(appointmentData);

        if (appointment) {
          form.reset();

          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          );
        }
      }
      // ================ Cancel appointment =============================
      else {
        const appointmentId = appointment?.$id;
        const appointmentToUpdate = {
          userId,
          appointmentId: appointmentId!,
          appointment: {
            primaryPhysician: values?.primaryPhysician,
            schedule: new Date(values.schedule),
            reason: values.reason!,
            note: values.note,
            cancellationReason: values?.cancellationReason,
            status: status as Status,
          },
          type,
        };

        const updatedAppointment = await updateAppointment(appointmentToUpdate);
        console.log(updatedAppointment);

        if (updatedAppointment) {
          setOpen(false);
          form.reset();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ========== Update the submit button label ===========
  let buttonLabel;

  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "create":
      buttonLabel = "Create Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {type === "create" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment 👋</h1>
            <p className="text-dark-700">
              Request a New Appointment in 10 Seconds
            </p>
          </section>
        )}

        {/* ============== Complete new appointment ================ */}
        {type !== "cancel" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a Doctor"
            >
              {Doctors.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      width={32}
                      height={32}
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label={appointment && appointment ? "Appointment Date" : "Expected Appointment Date"}
              showTimeSelect
              dateFormat="dd/MM/yyyy - h:mm aa"
            />

            <div className={`flex flex-col ${type === "create" && "lg:flex-row"} gap-6`}>
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Reason for Appointment"
                placeholder="Enter Reason for Appointment"
              />
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Note"
                placeholder="Enter Note"
              />
            </div>
          </>
        )}

        {/* ================== Cancel Appointment ======================== */}
        {type === "cancel" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="cancellationReason"
              label="Reason for Cancelation"
              placeholder="Enter Reason for Cancelation"
            />
          </>
        )}

        {/* ========= Submit Button ================ */}
        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
          } w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
