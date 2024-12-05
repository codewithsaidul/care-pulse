import { ID } from "node-appwrite";
import { databases } from "../appwrite.config";
import { parseStringify } from "../utils";




// Create a new appointment 
export const createAppointment = async (appointment: CreateAppointmentParams) => {
    try {
        const appointmentCollection = await databases.createDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID!,
            ID.unique(),
            appointment
          );
      
      
          return parseStringify(appointmentCollection);
    } catch (error) {
        console.log(error);
    }
}