"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";

import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { PatientFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { registerPatient } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";

const RegisterForm = ({ user }: { user: User }) => {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });
  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    // Do something with the form values.
    setIsLoading(true);

    let formData;
    if (values.identificationDocument && values.identificationDocument.length > 0) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append('fileName', values.identificationDocument[0].name)
    }

    const patientData = {
      ...values,
      userId: user.$id || null,
      birthDate: new Date(values.birthDate),
      identificationDocument: formData
    }

    console.log("all patient data: ", patientData)

    //@ts-expect-error nothing
    const patient = await registerPatient(patientData);

    console.log(patient)

    if (patient) router.push(`/patients/${patient.$id}/new-appointment`);

    
    try {
    } catch (err) {
      console.log(err);
    }

    // ✅ This will be type-safe and validated.
    // console.log(values);
  };


  console.log(form.formState.errors)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself</p>
        </section>

        <section className="space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>

        {/* ========================== Personal Information =============================== */}
        {/* ========== Full Name Field ================ */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        {/* ========== Full Name Field ================ */}

        {/* ========= Email & Phone Number =========== */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* ========== Email Field ================ */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="E-Mail Address"
            placeholder="example@gmail.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />
          {/* ========== Email Field ================ */}

          {/* ========== Phone Number Field ================ */}
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder="+880 123-4567890"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />
          {/* ========== Phone Number Field ================ */}
        </div>

        {/* ========= Birh Date & Gender =========== */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* ========== Date of Birth ================ */}
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birthDate"
            label="Date of Birth"
            // dateFormat="d/M/yyyy"
            placeholder="Select Your Birth Date"
          />
          {/* ========== Date of Birth ================ */}

          {/* ========== Gender Field ================ */}
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeletons={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
          {/* ========== Gender Number Field ================ */}
        </div>

        {/* ========= Address & Occupation =========== */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* ========== Address Field ================ */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="address"
            label="Address"
            placeholder="14th Street, New York"
          />
          {/* ========== Address Field ================ */}

          {/* ========== Occupation Field ================ */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="occupation"
            label="Occupation"
            placeholder="Software Engineer"
          />
          {/* ========== Occupation Field ================ */}
        </div>

        {/* ========= Emergency Contact =========== */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* ========== Emergency Contact Name Field ================ */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="emergencyContactName"
            label="Emergency Contact Name"
            placeholder="Gurdian's Name"
          />
          {/* ========== Emergency Contact Name Field ================ */}

          {/* ========== Emergency Contact Number Field ================ */}
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="emergencyContactNumber"
            label="Emergency Contact Number"
            placeholder="+880 123-4567890"
          />
          {/* ========== Emergency Contact Number Field ================ */}
        </div>

        {/* ========================== Personal Information =============================== */}

        {/* ========================== Medical Information =============================== */}
        <section className="space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>

        {/* =========== Primary Physician ================== */}
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="primaryPhysician"
          label="Primary Physician"
          placeholder="Select a Physician"
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
        {/* =========== Primary Physician ================== */}

        {/* ========= Insurance =========== */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* ========== Insurance Provider Field ================ */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insuranceProvider"
            label="Insurance Provider"
            placeholder="BlueCross blueShield"
          />
          {/* ========== Insurance Provider Field ================ */}

          {/* ========== Insurance Policy Number Field ================ */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insurancePolicyNumber"
            label="Insurance Policy Number"
            placeholder="ABC-001456"
          />
          {/* ========== Insurance Policy Number Field ================ */}
        </div>

        {/* ========= Allergies & CurrentMedication =========== */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* ========== Allergies Field ================ */}
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="allergies"
            label="Allergies (if any)"
            placeholder="Peanuts, Penicillin, Pollin"
          />
          {/* ========== Allergies Field ================ */}

          {/* ========== CurrentMedication Field ================ */}
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="currentMedication"
            label="Current Medication (if any)"
            placeholder="Ibuprofen 200mg, Paracetamol 500mg"
          />
          {/* ========== CurrentMedication Field ================ */}
        </div>

        {/* ========= Family & Past Medical History =========== */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* ========== Family Medical History Field ================ */}
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="familyMedicalHistory"
            label="Family Medical History"
            placeholder="Mother Had Brain Cancer"
          />
          {/* ========== Family Medical History Field ================ */}

          {/* ========== Past Medical History Field ================ */}
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="pastMedicalHistory  "
            label="Past Medical History"
            placeholder="Appendectomy, Tonsillectomy"
          />
          {/* ========== Past Medical History Field ================ */}
        </div>
        {/* ========================== Medical Information =============================== */}

        {/* =========================== Identification & Verification ============================= */}
        <section className="space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification & Verification</h2>
          </div>
        </section>

        {/* ========== Identification Type ============= */}
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="identificationType"
          label="Identification Type"
          placeholder="Select an Identification Type"
        >
          {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </CustomFormField>
        {/* ========== Identification Type ============= */}

        {/* ========== Identification Number ============= */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="identificationNumber"
          label="Identification Number"
          placeholder="123456789"
        />
        {/* ========== Identification Number ============= */}

        {/* ========== Identification Document Scan ============= */}
        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="identificationDocument"
          label="Scan Copy of Identification Document"
          renderSkeletons={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />
        {/* ========== Identification Document Scan ============= */}
        {/* =========================== Identification & Verification ============================= */}

        {/* =========================== Privacy & Consent ============================= */}
        <section className="space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent & Privacy</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="I Consent to Treatment"
        />
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="I Consent to Disclosure of Information"
        />
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="I Consent to Privacy & Policy"
        />
        {/* =========================== Privacy & Consent ============================= */}

        {/* ========= Submit Button ================ */}
        <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
