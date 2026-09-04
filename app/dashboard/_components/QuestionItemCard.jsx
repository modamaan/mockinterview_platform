import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const QuestionItemCard = ({ question }) => {
  const router = useRouter();
  const onStart = () => {
    router.push("/dashboard/pyq/" + question?.mockId);
  };

  return (
    <div className="border border-gray-300 shadow-md rounded-lg p-4 bg-white hover:shadow-lg transition-shadow duration-200">
      <div className="mb-3">
        <h2 className="font-bold text-lg text-primary mb-1">
          {question?.jobPosition}
        </h2>
        <p className="text-sm text-gray-600">
          {question?.jobExperience} Years of Experience
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Created At: {new Date(question.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex justify-end mt-4">
        <Button onClick={onStart} size="sm" className="w-full">
          Start
        </Button>
      </div>
    </div>
  );
};

export default QuestionItemCard;