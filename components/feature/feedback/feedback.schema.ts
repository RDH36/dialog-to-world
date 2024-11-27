import { z } from "zod";

export const feedbackSchema = z.object({
  type: z.enum(["suggestion", "issue", "question"], {
    required_error: "You must select a feedback type.",
  }),
  message: z
    .string()
    .min(10, { message: "Feedback must be at least 10 characters." })
    .max(1000, { message: "Feedback must not exceed 1000 characters." }),
});

export type FeedbackInput = z.infer<typeof feedbackSchema>;
