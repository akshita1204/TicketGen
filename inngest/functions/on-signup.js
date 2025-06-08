import {inngest} from "../client.js"
import User from "../../models/user.js"
import { NonRetriableError } from "inngest"
import { sendMail } from "../../utils/mailer.js"

export const onUserSignup = inngest.createFunction(
  { id: "on-user-signup", retries: 2 },
  { event: "user/signup" },
  async ({ event, step }) => {
    try {
      const { email } = event.data;

      const user = await step.run("get-user-email", async () => {
        const userobject = await User.findOne({ email });
        if (!userobject) {
          throw new NonRetriableError("User no longer exists in our database");
        }
        return userobject;
      });

      await step.run("send welcome mail", async () => {
        const subject = `Welcome to the App`;
        const message = `Hey! Thanks for signup`;
        await sendMail(user.email, subject, message);
      });

      return { success: true };
    } catch (err) {
      console.log("Error in onUserSignup:", err.message);
      return { success: false, error: err.message };
    }
  }
);
