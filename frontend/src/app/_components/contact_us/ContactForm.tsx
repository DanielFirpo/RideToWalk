"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@components/shadcn/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@components/shadcn/form";
import { Input } from "@components/shadcn/input";
import { Textarea } from "@components/shadcn/textarea";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@components/shadcn/alert-dialog";
import { useState } from "react";

const contactFormSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required.",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  message: z.string().min(5, {
    message: "Message must be at least 5 characters.",
  }),
  honeypot: z.string().optional(),
});

export function ContactForm() {
  const [alertOpen, setAlertOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
      honeypot: "",
    },
  });

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((response) => {
      if (response.status === 200) {
        setAlertOpen(true);
        form.reset();
      } else {
        alert("Failed to send form data. Please manually email us instead.");
      }
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto max-w-[50rem] space-y-8 rounded-lg border bg-eggshell p-10 font-grotesk"
        >
          <div className="flex w-full flex-col gap-10 sm:flex-row">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-bold">First Name</FormLabel>
                  <FormControl>
                    <Input autoComplete="given-name" placeholder="Enter your first name here." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-bold">Last Name</FormLabel>
                  <FormControl>
                    <Input autoComplete="family-name" placeholder="Enter your last name here." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Email</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="email"
                    type="email"
                    placeholder="Enter your email here so we can respond to your inquiry."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Message</FormLabel>
                <FormControl>
                  <Textarea autoComplete="off" className="min-h-52" placeholder="Enter your message for us here." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="honeypot"
            render={({ field }) => (
              <FormItem aria-hidden className="absolute left-0 top-0 -z-10 h-0 w-0 opacity-0">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input autoComplete="off" type="tel" placeholder="Enter your Phone Number here." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" variant={"secondary"} className="ml-auto py-6">
              Submit
            </Button>
          </div>
        </form>
      </Form>
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Thank you for your email!</AlertDialogTitle>
            <AlertDialogDescription>
              We have successfully recieved your inquiry and will get back to you as soon as we can!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="py-6">OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
