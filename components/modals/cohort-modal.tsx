"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useCohortModal } from "@/hooks/use-cohort-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  CapTableResponse,
  RevenueProjectionTypeResponse,
  RevenueShareTypeResponse,
} from "@/types/types";
import {
  getAllRevenueProjectionTypes,
  getAllRevenueShareTypes,
} from "@/actions/types-action";
import { getAllReturnCapTables } from "@/actions/cap-table-actions";
import { createCohort } from "@/actions/cohorts-actions";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().default(""),
  maxFacilityTerm: z.coerce.number(),
  payoffMonthId: z.coerce.number(),
  revenueProjectionTypeId: z.coerce.number(),
  revenueShareTypeId: z.coerce.number(),
});

export const CohortModal = () => {
  const cohortModal = useCohortModal();
  const [loading, setLoading] = useState(false);
  const [revenueProjectionTypes, setRevenueProjectionTypes] = useState<
    RevenueProjectionTypeResponse[]
  >([]);
  const [revenueShareTypes, setRevenueShareTypes] = useState<
    RevenueShareTypeResponse[]
  >([]);
  const [capTables, setCapTables] = useState<CapTableResponse[]>([]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await getAllRevenueProjectionTypes();
        setRevenueProjectionTypes(res1);
        const res2 = await getAllRevenueShareTypes();
        setRevenueShareTypes(res2);
        const res3 = await getAllReturnCapTables();
        setCapTables(res3);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      maxFacilityTerm: 0,
      description: "",
      payoffMonthId: 0,
      revenueProjectionTypeId: 0,
      revenueShareTypeId: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await createCohort(values);
      if (response) {
        toast.success("Cohort Created");
        window.location.reload();
      }
      cohortModal.onClose();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Cohort"
      description="Add a new cohort"
      isOpen={cohortModal.isOpen}
      onClose={cohortModal.onClose}
    >
      <div className="spaye-y-4 py-2 pb-4 w-72 md:w-96">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cohort Name:</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="maxFacilityTerm"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Facility Term:</FormLabel>
                  <FormControl>
                    <Input placeholder="Max-Facility-Term" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="payoffMonthId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payoff Month:</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value.toString()}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select PayoffMonth"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {capTables.map((payoffMonth) => (
                        <SelectItem
                          key={payoffMonth.id}
                          value={payoffMonth.id?.toString() || ""}
                        >
                          {payoffMonth.month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="revenueProjectionTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Revenue Projection Type:</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value.toString()}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select Projection Type"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {revenueProjectionTypes.map((projectionType) => (
                        <SelectItem
                          key={projectionType.id}
                          value={projectionType.id?.toString() || ""}
                        >
                          {projectionType.type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="revenueShareTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Revenue Share Type:</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value.toString()}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select Share Type"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {revenueShareTypes.map((shareType) => (
                        <SelectItem
                          key={shareType.id}
                          value={shareType.id?.toString() || ""}
                        >
                          {shareType.type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description:</FormLabel>
                  <FormControl>
                    <Input placeholder="Description here ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
              <Button
                variant="outline"
                type="button"
                onClick={cohortModal.onClose}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="bg-cyan-500">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
