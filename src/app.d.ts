declare global {
  namespace App {
    interface Locals {
      user: import("lucia").User | null;
      session: import("lucia").Session | null;
    }
    interface PageData {
      flash?: {
        type:
          | "success"
          | "error"
          | "somethingWentWrong"
          | "FormValidationError"
          | "remarkAdded"
          | "approvedAppointment"
          | "rejectedAppointment"
          | "deletedAppointment"
          | "unauthorizedAccess"
          | "appointmentSuccess"
          | "appointmentError"
          | "addedAccount"
          | "ActiveAdmin"
          | "On-leaveAdmin"
          | "Deny-AccessAdmin"
          | "deletedAdmin"
          | "loggedOut"
          | "loggedIn";
        message: string;
      };
    }
  }
}

export {};
