import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
// import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";


const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
    const user = await getPatient(userId);

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

          <AppointmentForm  />

          <p className="copyright py-12">&copy; 2025 Care Pulse</p>
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
  )
}

export default NewAppointment