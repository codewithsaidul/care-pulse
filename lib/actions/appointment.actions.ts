"use server";

import { ID, Query } from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";




// Create a new appointment
export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const appointmentCollection = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );

    return parseStringify(appointmentCollection);
  } catch (error) {
    console.log(error);
  }
};



// Get a Appointment
export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    )

    return parseStringify(appointment);
  } catch (error) {
    console.log(error);
  }
}



// Update the Appointment
export const updateAppointment = async ( { appointmentId, userId, appointment, type }: UpdateAppointmentParams ) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    )

    if (!updatedAppointment) {
      throw new Error("Appointment not found");
    } 

    // TODO: send SMS Notification


    revalidatePath('/admin');
    return parseStringify(updatedAppointment)
  } catch (error) {
    console.log(error);
  }
}


// Get Recent Appointment List
export const getRecentAppointmentList = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [
        Query.orderDesc("$createdAt"),
      ],
    )

    const initialCount = {
      scheduleCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    }

    const counts = (appointments.documents as Appointment[]).reduce((acc, appointment) => {
      if (appointment.status === "scheduled") {
        acc.scheduleCount++;
      } else if (appointment.status === "pending") {
        acc.pendingCount++;
      } else if (appointment.status === "cancelled") {
        acc.cancelledCount++;
      }
      return acc;
    }, initialCount)

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents
    }

    return parseStringify(data);
  } catch (error) {
    console.log(error);
  }
}
