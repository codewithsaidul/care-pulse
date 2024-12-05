import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Sucess = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);
  const doctor = Doctors.find(
    (doc) => doc.name === appointment.primaryPhysician
  );

  const doctorImage = doctor?.image;
  console.log(doctorImage);

  return (
    <div className="flex max-h-screen h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo of care pulse"
            width={1000}
            height={1000}
            className="w-fit h-10"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            alt="success"
            width={180}
            height={180}
          />

          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">Appointment Request</span> has
            been successfully submitted!
          </h2>

          <p>We will be in a touch shortly to confirm</p>
        </section>

        <section className="request-details">
          <p>Requested Appointment Details:</p>

          <div className="flex items-center gap-3">
            <Image
              src={doctorImage!}
              alt="doctor image"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>

          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              alt="calendar"
              width={24}
              height={24}
            />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <p className="copyright py-12">
          &copy; 2025 Care Pulse by{" "}
          <Link
            href="https://www.facebook.com/codewithsaidul1"
            target="_blank"
            className="text-green-500"
          >
            CodeWithSaidul
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Sucess;
