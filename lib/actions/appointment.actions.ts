"use server";

import { ID } from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "../appwrite.config";
import { parseStringify } from "../utils";




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
