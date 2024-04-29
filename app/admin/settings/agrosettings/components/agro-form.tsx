import React, { FC } from "react";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AssetResponse } from "@/types/types";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Check, Trash, X } from "lucide-react";
import {
  createScoringData,
  deleteScoringData,
  editScoringData,
} from "@/actions/agro-action";

type AgroFromProps = {
  updated: boolean;
  loading: boolean;
  setUpdated(updated: boolean): void;
  setLoading(loading: boolean): void;
  setAddNew(newState: string): void;
  agroData: AssetResponse | undefined;
  largestWeight: number;
  type: string;
};

const AgroForm: FC<AgroFromProps> = ({
  setAddNew,
  agroData,
  updated,
  setUpdated,
  setLoading,
  loading,
  largestWeight,
  type,
}) => {
  const formSchema = z.object({
    scoringDataType: z.coerce.string(),
    rangeStart: z.coerce.number().min(0).max(9998),
    rangeEnd: z.coerce.number().min(1).max(9999),
    weight: z.coerce.number().min(0).max(largestWeight),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: agroData
      ? {
          scoringDataType: agroData.scoringDataType,
          rangeStart: agroData.rangeStart,
          rangeEnd: agroData.rangeEnd,
          weight: agroData.weight,
        }
      : {
          scoringDataType: type,
          rangeStart: null,
          rangeEnd: null,
          weight: null,
        },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values);
    try {
      setLoading(true);
      agroData
        ? await editScoringData(values, agroData.id)
        : await createScoringData(values);
      setUpdated(!updated);
      toast.success(
        agroData ? "Updated Successfully!" : "Created Successfully!"
      );
      setAddNew("");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      agroData && (await deleteScoringData(agroData.id));
      setUpdated(!updated);
      toast.success("Deleted Successfully!");
      setAddNew("");
    } catch (error) {
      toast.error("Something went wrong!");
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-1 space-x-2 w-full">
            <div className="grid grid-cols-3 gap-2 w-full">
              <FormField
                control={form.control}
                name="rangeStart"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Start value"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rangeEnd"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="number" placeholder="End value" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="number" placeholder="Weight" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              size="icon"
              type="submit"
              disabled={loading}
              variant="outline"
            >
              <Check className="h-4 w-4" />
            </Button>
            {agroData && (
              <Button
                size="icon"
                disabled={loading}
                type="button"
                variant="destructive"
                onClick={() => onDelete()}
              >
                <Trash className="h-4 w-4" />
              </Button>
            )}
            <Button
              size="icon"
              disabled={loading}
              type="button"
              variant="outline"
              onClick={() => setAddNew("")}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AgroForm;
