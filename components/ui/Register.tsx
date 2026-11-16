"use client";

import { RegistrationStatus } from "@/components/registration/RegistrationStatus";

export function Register({
  text = "Registration updates",
  className = "",
}: {
  text?: string;
  className?: string;
}) {
  return <RegistrationStatus label={text.toUpperCase()} variant="primary" className={className} />;
}

export default Register;
