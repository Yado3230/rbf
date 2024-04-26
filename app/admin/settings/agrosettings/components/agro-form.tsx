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
import {
  createReturnCapTable,
  deleteReturnCapTable,
  editReturnCapTable,
} from "@/actions/cap-table-actions";
import { AssetResponse, CapTableResponse } from "@/types/types";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { createScoringData, editScoringData } from "@/actions/agro-action";

const formSchema = z.object({
  scoringDataType: z.coerce.string(),
  rangeStart: z.coerce.number().min(1).max(50),
  rangeEnd: z.coerce.number().min(1).max(50),
  weight: z.coerce.number().min(1).max(50),
});

type AgroFromProps = {
  updated: boolean;
  loading: boolean;
  setUpdated(updated: boolean): void;
  setLoading(loading: boolean): void;
  setAddNew(newState: string): void;
  agroData: AssetResponse | undefined;
};

const AgroForm: FC<AgroFromProps> = ({
  setAddNew,
  agroData,
  updated,
  setUpdated,
  setLoading,
  loading,
}) => {
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
          scoringDataType: "ANNUALFARMINCOME",
          rangeStart: null,
          rangeEnd: null,
          weight: 0,
        },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      setLoading(true);
      agroData
        // ? await editScoringData(values, agroData.id)
        : await createScoringData(values);
      setUpdated(!updated);
      toast.success(agroData ? "Updated" : "Created");
      setAddNew("");
    } catch (error) {
      toast.error("Something went wrong!");
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
                      <Input type="number" placeholder="Month" {...field} />
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
                      <Input
                        type="number"
                        placeholder="Fixed Revenue Share Rate"
                        {...field}
                      />
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
                      <Input
                        type="number"
                        placeholder="Variable Revenue Share Rate"
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
              type="submit"
              disabled={loading}
              variant="outline"
            >
              <Check className="h-4 w-4" />
            </Button>
            {/* {capTable && (
              <Button
                size="icon"
                disabled={loading}
                type="button"
                variant="destructive"
                onClick={() => onDelete()}
              >
                <Trash className="h-4 w-4" />
              </Button>
            )} */}
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
