"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const InterviewItemCard = ({ interview, onDelete }) => {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const onStart = () => {
    router.push("/dashboard/interview/" + interview?.mockId);
  };

  const onFeedback = () => {
    router.push("/dashboard/interview/" + interview?.mockId + "/feedback");
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const res = await fetch(`/api/interviews/${interview.mockId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to delete interview.");
        return;
      }

      toast.success("Interview deleted successfully.");
      setShowConfirm(false);
      onDelete?.(interview.mockId);
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="border border-gray-200 shadow-sm rounded-lg p-4 relative group hover:shadow-lg transition-shadow bg-white">
        {/* Delete button — top-right corner */}
        <button
          onClick={() => setShowConfirm(true)}
          className="absolute top-2 right-2 p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
          title="Delete interview"
        >
          <Trash2 className="h-4 w-4" />
        </button>

        <h2 className="font-bold text-primary pr-8 text-lg">
          {interview?.jobPosition}
        </h2>
        <p className="text-sm text-gray-600">
          {interview?.jobExperience} Years of experience
        </p>
        <p className="text-xs text-gray-400">
          Created At: {new Date(interview.createdAt).toLocaleDateString()}
        </p>
        <p className="text-xs text-gray-400">
          Interviewer: {interview?.interviewerName}
        </p>
        <p className="text-xs text-gray-400">
          Duration: {interview?.duration} minutes
        </p>

        <div className="flex justify-between mt-4 gap-2">
          <Button
            variant="primary"
            onClick={onFeedback}
            size="sm"
            className="w-full"
          >
            Feedback
          </Button>
          <Button
            variant="outline"
            onClick={onStart}
            size="sm"
            className="w-full"
          >
            Start
          </Button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="h-5 w-5" />
              Delete Interview
            </DialogTitle>
            <DialogDescription className="pt-2">
              Are you sure you want to delete{" "}
              <strong>"{interview?.jobPosition}"</strong>?
              <br />
              <span className="text-red-500 text-xs mt-1 block">
                This will permanently delete the interview and all recorded
                answers. This cannot be undone.
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="ghost"
              onClick={() => setShowConfirm(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-500 hover:bg-red-600"
            >
              {deleting ? "Deleting..." : "Yes, Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InterviewItemCard;