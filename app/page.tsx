import PatientForm from "@/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-screen max-h-screen">

      {/* ============== TODO: OTP Verification ======================= */}

      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[495px]">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="care pulse logo"
            width={1000}
            height={1000}
            className="mb-12 h-10 w-fit"
          />

          <PatientForm />

          {/* Home Page */}
          <div className="text-14-regular mt-20 flex justify-between pb-7">
            <p className="justify-items-end text-dark-600 xl:text-left">
              &copy; 2025 Care Pulse
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        alt="onboarding image"
        width={1000}
        height={1000}
        className="side-img max-w-[50%]"
      />
    </main>
  );
}
