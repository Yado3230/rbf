import React, { FC, Dispatch, SetStateAction } from "react";

import { Input } from "@/components/ui/input";
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
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const formSchema = z.object({
  weight: z.coerce.number().min(1).max(100),
  intervalStart: z.coerce.number(),
  valueStart: z.coerce.number(),
  intervalEnd: z.coerce.number().min(1),
  intervalIncrement: z.coerce.number().min(1),
  valueIncrement: z.coerce.number().min(1),
});

type CapTableFromProps = {
  updated: boolean;
  loading: boolean;
  setUpdated(updated: boolean): void;
  setFormData: Dispatch<
    SetStateAction<{
      weight: number;
      intervalStart: number;
      intervalEnd: number;
      valueStart: number;
      intervalIncrement: number;
      valueIncrement: number;
    }>
  >;
  setLoading(loading: boolean): void;
  setAddNew(newState: string): void;
};

const TrainingStatusFrom: FC<CapTableFromProps> = ({
  setAddNew,
  updated,
  setUpdated,
  setLoading,
  setFormData,
  loading,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values);
    setFormData({
      intervalStart: values.intervalStart,
      intervalEnd: values.intervalEnd,
      valueStart: values.valueStart,
      intervalIncrement: values.intervalIncrement,
      valueIncrement: values.valueIncrement,
    });
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-1 w-full space-x-2">
            <div className="grid w-full grid-cols-6 gap-2">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="weight" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="intervalStart"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interval Start</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Interval start"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="intervalEnd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interval End</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Interval end"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="valueStart"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value Start</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Value start"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="intervalIncrement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interval Increment</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Interval increment"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="valueIncrement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value Increment</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Value increment"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              size="icon"
              className="mt-8 bg-cyan-500"
              disabled={loading}
              type="submit"
            >
              <Check className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TrainingStatusFrom;
