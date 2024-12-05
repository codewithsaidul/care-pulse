import Image from "next/image";
import Link from "next/link";
import React from "react";

const Admin = () => {
  return (
    <div className="mx-auto flex  max-w-7xl flex-col space-y-14">
      {/* ========== Admin Dashboard Header ================= */}
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo of care pulse"
            width={160}
            height={30}
            className="w-fit h-8"
          />
        </Link>

        <p className="text-16-semibold">Admin Dashboard</p>
      </header>


      {/* ============== Admin Dashboard  Main Content ===================== */}
      <main className="admin-main">

        {/* ===== Admin Dashboard Heding ===== */}
        <section className="w-full space-y-4">
            <h1 className="header">Welcome 👋</h1>
            <p className="text-dark-700">Start the day with managing new Appointments</p>
        </section>

        {/* ===== Admin Dashboard Stat ===== */}
        <section className="admin-stat"></section>
      </main>
    </div>
  );
};

export default Admin;
