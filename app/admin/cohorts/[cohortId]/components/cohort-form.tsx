"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import {
  CapTableResponse,
  CohortResponse,
  RevenueProjectionTypeResponse,
  RevenueShareTypeResponse,
} from "@/types/types";
import {
  createCohort,
  deleteCohort,
  editCohort,
} from "@/actions/cohorts-actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCohortModal } from "@/hooks/use-cohort-modal";
import {
  getAllRevenueProjectionTypes,
  getAllRevenueShareTypes,
} from "@/actions/types-action";
import { getAllReturnCapTables } from "@/actions/cap-table-actions";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().default(""),
  maxFacilityTerm: z.coerce.number().default(0),
});

interface LevelFormProps {
  initialData: CohortResponse | null;
}

type LevelFormValues = z.infer<typeof formSchema>;

export const LevelForm: React.FC<LevelFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
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
  const params = useParams();
  const router = useRouter();

  const title = initialData?.id ? "Edit Cohort" : "Create Cohort";
  const description = initialData?.id ? "Edit a Cohort" : "Add a new Cohort";
  const toastMessage = initialData?.id ? "Cohort updated." : "Cohort created";
  const action = initialData?.id ? "Save changes" : "Create";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData?.id
      ? {
          name: initialData?.name,
          maxFacilityTerm: initialData?.maxFacilityTerm,
          description: initialData?.description,
        }
      : {
          name: "",
          maxFacilityTerm: 0,
          description: "",
        },
  });

  const onSubmit = async (data: LevelFormValues) => {
    try {
      setLoading(true);
      if (initialData?.id) {
        await editCohort(data, params.levelId.toString());
      } else {
        await createCohort(data);
      }
      router.refresh();
      router.push(`/admin/cohorts`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await deleteCohort(params.colorId.toString());
      router.refresh();
      router.push(`/admin/cohorts`);
      toast.success("Cohort deleted.");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData?.id && (
          <Button
            variant="destructive"
            disabled={loading}
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <div className="spaye-y-4 py-2 pb-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid md:grid-cols-2 gap-4"
          >
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
                    <Input
                      type="number"
                      placeholder="Max-Facility-Term"
                      {...field}
                    />
                  </FormControl>
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
            <div></div>
            <div className="pt-6 space-x-2 flex items-start justify-end">
              <Button
                variant="outline"
                type="button"
                onClick={cohortModal.onClose}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="bg-cyan-500">
                {action}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
