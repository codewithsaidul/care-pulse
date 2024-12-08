import { StatCard } from "@/components/StatCard";
import {columns} from "@/components/table/columns";
import {DataTable} from "@/components/table/DataTable";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";





const Admin = async () => {

    const appointments = await getRecentAppointmentList();


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
          <p className="text-dark-700">
            Start the day with managing new Appointments
          </p>
        </section>

        {/* ===== Admin Dashboard Stat ===== */}
        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments?.scheduleCount ?? 0}
            label="Schedule Appointments"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={appointments?.pendingCount ?? 0}
            label="Pending Appointments"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={appointments?.cancelledCount ?? 0}
            label="Cancelled Appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>


        {/* ============== All Patient Data Table =================== */}
        <DataTable columns={columns} data={appointments?.documents ?? null} />
      </main>
    </div>
  );
};

export default Admin;
