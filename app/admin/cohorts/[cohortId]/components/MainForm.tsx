// "use client";
import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AlertModal } from "@/components/modals/alert-modal";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { CohortResponse } from "@/types/types";
import {
  createCohort,
  deleteCohort,
  editCohort,
} from "@/actions/cohorts-actions";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CapTables from "./creators/CapTables";
import Drivers from "./creators/Drivers";
import Types from "./creators/Types";
import Risks from "./creators/Risks";

const steps = [
  {
    id: "1",
    name: "Basic Info",
    fields: ["name", "maxFacilityTerm", "description"],
  },
  {
    id: "2",
    name: "Types",
  },
  {
    id: "3",
    name: "Risks",
  },
  {
    id: "4",
    name: "Cap Table",
  },
  {
    id: "5",
    name: "Drivers",
  },
  {
    id: "6",
    name: "Confirmations",
  },
];

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  maxFacilityTerm: z.coerce.number().min(1),
});

interface LevelFormProps {
  initialData: CohortResponse | null;
}

type LevelFormValues = z.infer<typeof formSchema>;

export const MainForm: React.FC<LevelFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [cohortId, setCohortId] = useState(0);

  const delta = currentStep - previousStep;

  const params = useParams();
  const router = useRouter();

  const title = initialData?.id ? "Edit Cohort" : "Create Cohort";
  const description = initialData?.id ? "Edit a Cohort" : "Add a new Cohort";
  const toastMessage = initialData?.id ? "Cohort updated." : "Cohort created";

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

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        maxFacilityTerm: initialData.maxFacilityTerm,
        description: initialData.description,
      });
      setCohortId(initialData.id);
    }
  }, [initialData]);

  const makeApiRequest = async (data: LevelFormValues) => {
    console.log(initialData?.id);
    try {
      setLoading(true);
      const res = initialData?.id
        ? await editCohort(data, initialData?.id)
        : await createCohort(data);
      setCohortId(res.id);
      toast.success(toastMessage);
    } catch (error) {
      console.error("Error making API request", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const next = useCallback(async () => {
    try {
      // Trigger form validation
      const isValid = await form.trigger();

      if (isValid && currentStep < steps.length - 1) {
        // If it's the first step, make the API request
        if (currentStep === 0) {
          if (!cohortId) {
            await makeApiRequest(form.getValues());
          }
        }
        setPreviousStep((step) => step + 1);
        setCurrentStep((step) => step + 1);
      }
    } catch (error) {
      console.error("Error during form validation", error);
    }
  }, [form, currentStep, initialData]);

  const prev = useCallback(() => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  }, [currentStep]);

  const onDelete = async () => {
    try {
      setLoading(true);
      await deleteCohort(Number(initialData?.id));
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
      <section className="inset-0 flex flex-col justify-between">
        {/* steps */}
        <nav aria-label="Progress">
          <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
            {steps.map((step, index) => (
              <div key={step.name} className="md:flex-1">
                {currentStep > index ? (
                  <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-cyan-500 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                      <svg
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <span className="whitespace-nowrap">{step.name}</span>
                    </span>
                  </li>
                ) : currentStep === index ? (
                  <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-cyan-500 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                      <span className="me-2 whitespace-nowrap">{step.id}</span>
                      <span className="whitespace-nowrap">{step.name}</span>
                    </span>
                  </li>
                ) : (
                  <li className="flex items-center">
                    <span className="me-2 whitespace-nowrap">{step.id}</span>
                    <span className="whitespace-nowrap">{step.name}</span>
                  </li>
                )}
              </div>
            ))}
          </ol>
        </nav>

        {/* Form */}
        {currentStep === 0 && (
          // <motion.div
          //   initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
          //   animate={{ x: 0, opacity: 1 }}
          //   transition={{ duration: 0.3, ease: "easeInOut" }}
          // >
          <Form {...form}>
            <form className="grid md:grid-cols-2 gap-4 mt-10">
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
            </form>
          </Form>
          // </motion.div>
        )}

        {currentStep === 3 && (
          <div className="mt-10">
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <CapTables cohortId={cohortId} />
            </motion.div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="mt-10">
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Drivers cohortId={cohortId} />
            </motion.div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="mt-10">
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Types cohortId={cohortId} />
            </motion.div>
          </div>
        )}
        {currentStep === 2 && (
          <div className="mt-10">
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Risks cohortId={cohortId} />
            </motion.div>
          </div>
        )}

        <form className="mt-8 w-full">
          {currentStep === 5 && (
            <>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Complete
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Thank you for your submission.
              </p>
            </>
          )}
        </form>

        {/* Navigation */}
        <div className="mt-8 pt-5">
          <div className="flex justify-between">
            <button
              type="button"
              onClick={prev}
              disabled={currentStep === 0}
              className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              disabled={currentStep === steps.length - 1}
              className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
