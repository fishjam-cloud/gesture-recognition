import { useConnection } from "@fishjam-cloud/react-client";
import { getRoomCredentials } from "../utils/roomManager";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "lucide-react";
import { useEffect, useId, useRef } from "react";

const formSchema = z.object({
  roomName: z.string().nonempty({
    message: "Room name should be non-empty.",
  }),
  peerName: z.string().nonempty({
    message: "Peer name should be non-empty.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues = {
  roomName: "",
  peerName: "",
} as const;

export default function HomeView() {
  const { joinRoom } = useConnection();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const formId = useId();

  const isSubmitting = form.formState.isSubmitting;

  const handleSubmit = async ({ roomName, peerName }: FormValues) => {
    const { peerToken, url } = await getRoomCredentials(roomName, peerName);
    await joinRoom({ url, peerToken, peerMetadata: { name: peerName } });
  };

  return (
    <Card className="m-auto w-md">
      <CardHeader>
        <CardTitle>Join a room</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            id={formId}
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="roomName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room</FormLabel>
                  <FormControl>
                    <Input placeholder="Room name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="peerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Peer</FormLabel>
                  <FormControl>
                    <Input placeholder="Peer name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          className="w-28"
          disabled={isSubmitting}
          type="submit"
          form={formId}
        >
          {isSubmitting ? <Loader className="animate-spin" /> : "Join room"}
        </Button>
      </CardFooter>
    </Card>
  );
}
