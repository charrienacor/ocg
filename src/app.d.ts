declare global {
  namespace App {
    interface Locals {
      user: import("lucia").User | null;
      session: import("lucia").Session | null;
    }
    interface PageData {
      flash?: { type: 'success' | 'error' | 'somethingWentWrong' | 'unauthorizedAccess' | 'appointmentSuccess' | 'appointmentError' | 'loggedOut' | 'loggedIn'; message: string };
    }
  }
}

export { };
