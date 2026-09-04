import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const QuestionItemCard = ({ question }) => {
  const router = useRouter();

  const onStart = () => {
    router.push("/dashboard/pyq/" + question?.mockId);
  };

  const onViewDetails = () => {
    router.push("/dashboard/question/" + question?.id);
  };

  return (
    <div className="border border-gray-300 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 ease-in-out bg-white">
      <h2 className="font-bold text-primary text-lg">{question?.jobPosition}</h2>
      <p className="text-sm text-gray-600">
        {question?.jobExperience} Years of Experience
      </p>
      <p className="text-xs text-gray-500">Created At: {new Date(question.createdAt).toLocaleDateString()}</p>
      
      <div className="flex justify-between items-center mt-4 gap-3">
        <Button onClick={onStart} size="sm" className="flex-1 bg-blue-500 text-white hover:bg-blue-600">
          Start
        </Button>
        <Button onClick={onViewDetails} size="sm" variant="outline" className="flex-1 border-blue-500 text-blue-500 hover:bg-blue-100">
          View Details
        </Button>
      </div>
    </div>
  );
};

export default QuestionItemCard;