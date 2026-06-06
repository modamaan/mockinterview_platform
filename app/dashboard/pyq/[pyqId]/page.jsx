"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const page = ({ params }) => {
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuestionDetails();
  }, []);

  const getQuestionDetails = async () => {
    try {
      const res = await fetch(`/api/questions/${params.pyqId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch mock question details");
      }
      
      const result = await res.json();
      const parsedData = JSON.parse(result.MockQuestionJsonResp);
      setQuestionData(parsedData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load question details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 md:p-12 max-w-5xl mx-auto my-5 flex flex-col gap-4 animate-pulse">
        <Skeleton className="h-16 w-full rounded-xl bg-secondary" />
        <Skeleton className="h-16 w-full rounded-xl bg-secondary" />
        <Skeleton className="h-16 w-full rounded-xl bg-secondary" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto my-5 animate-fade-in">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gradient mb-2">
          Previous Year Questions
        </h2>
        <p className="text-muted-foreground font-medium">Review standard interview questions with suggested answers.</p>
      </div>

      {questionData && questionData.length > 0 ? (
        <div className="bg-card card-shadow rounded-3xl p-2 md:p-6 border-2 border-primary/5">
          <Accordion type="single" collapsible className="w-full">
            {questionData.map((item, index) => (
              <AccordionItem value={`item-${index + 1}`} key={index} className="mb-4 border-b-0 border border-border/50 rounded-2xl overflow-hidden bg-background">
                <AccordionTrigger className="text-left font-bold text-foreground/90 px-6 py-5 hover:bg-secondary/50 transition-colors hover:no-underline data-[state=open]:text-primary data-[state=open]:bg-primary/5">
                  <div className="flex gap-4">
                    <span className="text-primary/70 shrink-0">Q{index + 1}.</span>
                    <span>{item?.Question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="bg-secondary/20 p-6 pt-4 border-t border-border/50">
                  <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none prose-pre:bg-black/90 prose-pre:text-gray-100 prose-pre:border prose-pre:border-border/50 prose-pre:shadow-sm prose-pre:rounded-xl">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {item?.Answer}
                    </ReactMarkdown>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ) : (
        <div className="text-center bg-secondary/30 rounded-3xl border-2 border-dashed py-20">
          <p className="text-muted-foreground font-semibold text-lg">No questions data available.</p>
        </div>
      )}
    </div>
  );
};

export default page;
