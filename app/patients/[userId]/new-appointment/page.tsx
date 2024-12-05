import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
// import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="care pulse logo"
            width={1000}
            height={1000}
            className="mb-12 h-10 w-fit"
          />

          <AppointmentForm
            patientId={patient?.$id}
            userId={userId}
            type="create"
          />

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
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        alt="onboarding image"
        width={1000}
        height={1000}
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default NewAppointment;
